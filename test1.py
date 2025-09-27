import os
import base64
import pandas as pd
import json
import re
import time
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

base_path = r"C:\Users\baofa\OneDrive\Desktop\accounting"  # 总目录
records = []

# 遍历每个客户文件夹
for customer in os.listdir(base_path):
    customer_folder = os.path.join(base_path, customer)
    if not os.path.isdir(customer_folder):
        continue

    for file in os.listdir(customer_folder):
        if file.lower().endswith((".jpg", ".png", ".jpeg")):
            filepath = os.path.join(customer_folder, file)

            # 读取并转成 base64
            with open(filepath, "rb") as f:
                img_b64 = base64.b64encode(f.read()).decode("utf-8")

            # 提示词（更简洁，减少 reasoning token）
            prompt = """
请从这张小票中提取【应收金额】和【日期】，
{"应收金额": 123.45, "日期": "20250926"}
只输出 JSON，不要解释。
"""

            date, total = "", ""
            try:
                response = client.chat.completions.create(
                    model="gpt-5-nano",   # ✅ 改成 gpt-5-nano
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": prompt},
                                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_b64}"}}
                            ]
                        }
                    ],
                    max_completion_tokens=2000  # 
                )

                print("======== 原始返回 ========")
                print(response)

                # 提取模型输出
                message = response.choices[0].message
                raw = ""
                if isinstance(message.content, str):
                    raw = message.content.strip()
                elif isinstance(message.content, list):
                    raw = "".join(
                        [c.get("text", "") for c in message.content if "text" in c]
                    ).strip()

                # 清理掉 ```json 包裹
                raw_cleaned = re.sub(r"^```[a-zA-Z]*\n?", "", raw).strip()
                raw_cleaned = re.sub(r"```$", "", raw_cleaned).strip()

                try:
                    data = json.loads(raw_cleaned)
                    date = data.get("日期", "")
                    total = data.get("应收金额", "")
                except Exception as e:
                    print("⚠️ JSON解析失败:", e)
                    print("原始内容:", raw)
                    date, total = "", ""

            except Exception as e:
                date, total = "", f"Error: {e}"

            # 保存结果
            records.append({
                "客户": customer,
                "文件名": file,
                "日期": date,
                "应收金额": total
            })

            # 防止 429 限流
            time.sleep(0.5)

# 保存到 Excel
df = pd.DataFrame(records)
output_file = os.path.join(base_path, "记账汇总_gpt5nano.xlsx")
df.to_excel(output_file, index=False)
print(f"✅ 已生成 {output_file}")
