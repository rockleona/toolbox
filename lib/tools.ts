// 新增工具的 id 和 description 屬性
const tools = [
  {
    id: "base64-tool",
    name: "Base64 Tool",
    path: "/tools/base64-tool",
    category: "Encoding",
    description: "Encode and decode Base64 strings.",
    icon: "Code"
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    path: "/tools/json-formatter",
    category: "Formatting",
    description: "Format and validate JSON data.",
    icon: "Braces",
  },
  {
    id: "url-encoder",
    name: "URL Encoder",
    path: "/tools/url-encoder",
    category: "Encoding",
    description: "Encode and decode URLs.",
    icon: "Link"
  },
  {
    id: "color-picker",
    name: "Color Picker",
    path: "/tools/color-picker",
    category: "Design",
    description: "Pick and convert colors.",
    icon: "palette"
  }
]

export default tools;