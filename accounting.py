from transformers import LlavaForConditionalGeneration, AutoProcessor
import torch
from PIL import Image

# 1. 模型名称
model_name = "llava-hf/llava-1.5-7b-hf"

# 2. 加载模型 & 处理器
processor = AutoProcessor.from_pretrained(model_name)
model = LlavaForConditionalGeneration.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    device_map="auto"
)

# 3. 打开图片
image = Image.open("receipt.jpg")

# 4. 构造 prompt
prompt = "请从这张收据中提取商店名称、商品、数量、单价、合计金额和日期，用 JSON 格式输出。"

inputs = processor(text=prompt, images=image, return_tensors="pt").to("cuda")

# 5. 推理
with torch.no_grad():
    output = model.generate(**inputs, max_new_tokens=512)

result = processor.decode(output[0], skip_special_tokens=True)
print(result)
