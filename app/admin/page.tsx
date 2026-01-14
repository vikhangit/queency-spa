"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, Trash2, LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

function ImageUpload({ onUpload, value }: { onUpload: (url: string) => void, value: string }) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        onUpload(data.url)
        toast.success("Tải ảnh lên thành công!")
      }
    } catch (error) {
      toast.error("Lỗi khi tải ảnh lên")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Input
          value={value}
          onChange={(e) => onUpload(e.target.value)}
          placeholder="URL hình ảnh"
          className="flex-1"
        />
        <div className="relative">
          <input
            type="file"
            className="hidden"
            id={`upload-${value}`}
            onChange={handleFileChange}
            accept="image/*"
          />
          <Button
            asChild
            variant="outline"
            disabled={uploading}
            className="cursor-pointer"
          >
            <label htmlFor={`upload-${value}`}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Đang tải..." : "Tải ảnh"}
            </label>
          </Button>
        </div>
      </div>
      {value && (
        <div className="mt-2 border rounded-lg p-2 w-fit">
          <img src={value} alt="Preview" className="h-20 w-auto object-contain" />
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [changingPassword, setChangingPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setContent(data)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        toast.success("Đã cập nhật nội dung thành công!")
      } else {
        toast.error("Lỗi khi cập nhật nội dung")
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối đến máy chủ")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (res.ok) {
        toast.success("Đã đăng xuất")
        router.push("/login")
      }
    } catch (error) {
      toast.error("Lỗi khi đăng xuất")
    }
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
      return
    }

    setChangingPassword(true)
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Đã đổi mật khẩu thành công")
        setCurrentPassword("")
        setNewPassword("")
      } else {
        toast.error(data.error || "Lỗi khi đổi mật khẩu")
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối đến máy chủ")
    } finally {
      setChangingPassword(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Đang tải nội dung...</div>

  const updateField = (section: string, field: string, value: any) => {
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quản lý nội dung (CMS)</h1>
        <div className="flex gap-4">
          <Button onClick={handleLogout} variant="outline" color="destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-11 h-auto gap-2">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="promo">Promo</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="banner">Banner</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-1" />
            Cài đặt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="header">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Header</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Tên Spa</label>
              <Input
                value={content.header.name}
                onChange={(e) => updateField("header", "name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slogan</label>
              <Input
                value={content.header.slogan}
                onChange={(e) => updateField("header", "slogan", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo</label>
              <ImageUpload
                value={content.header.logo}
                onUpload={(url) => updateField("header", "logo", url)}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Hero Section</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Tiêu đề</label>
              <Input
                value={content.hero.title}
                onChange={(e) => updateField("hero", "title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Từ nổi bật (Highlight)</label>
              <Input
                value={content.hero.highlight}
                onChange={(e) => updateField("hero", "highlight", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Khẩu hiệu</label>
              <Input
                value={content.hero.slogan}
                onChange={(e) => updateField("hero", "slogan", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <Textarea
                value={content.hero.description}
                onChange={(e) => updateField("hero", "description", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hình nền</label>
              <ImageUpload
                value={content.hero.backgroundImage}
                onUpload={(url) => updateField("hero", "backgroundImage", url)}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Dịch vụ</h2>
              <Button onClick={() => {
                const newServices = [...content.services, {
                  id: `service_${Date.now()}`,
                  icon: "Sparkles",
                  title: "Dịch vụ mới",
                  description: "Mô tả dịch vụ",
                  price: "0K",
                  duration: "60 phút",
                  benefits: [],
                  suitable_for: "",
                  process: [],
                  contraindications: []
                }]
                setContent({ ...content, services: newServices })
              }}>Thêm dịch vụ</Button>
            </div>
            {content.services.map((service: any, index: number) => (
              <div key={service.id} className="p-6 border rounded-lg space-y-4 relative bg-gray-50/50">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-4 right-4"
                  onClick={() => {
                    const newServices = content.services.filter((_: any, i: number) => i !== index)
                    setContent({ ...content, services: newServices })
                  }}
                ><Trash2 className="w-4 h-4" /></Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                    <Input
                      value={service.title}
                      onChange={(e) => {
                        const newServices = [...content.services]
                        newServices[index].title = e.target.value
                        setContent({ ...content, services: newServices })
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Giá</label>
                    <Input
                      value={service.price}
                      onChange={(e) => {
                        const newServices = [...content.services]
                        newServices[index].price = e.target.value
                        setContent({ ...content, services: newServices })
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Thời lượng</label>
                    <Input
                      value={service.duration}
                      onChange={(e) => {
                        const newServices = [...content.services]
                        newServices[index].duration = e.target.value
                        setContent({ ...content, services: newServices })
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Icon (Sparkles, Zap, Leaf, Wind)</label>
                    <Input
                      value={service.icon}
                      onChange={(e) => {
                        const newServices = [...content.services]
                        newServices[index].icon = e.target.value
                        setContent({ ...content, services: newServices })
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Mô tả tóm tắt</label>
                  <Textarea
                    value={service.description}
                    onChange={(e) => {
                      const newServices = [...content.services]
                      newServices[index].description = e.target.value
                      setContent({ ...content, services: newServices })
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phù hợp cho</label>
                  <Input
                    value={service.suitable_for}
                    onChange={(e) => {
                      const newServices = [...content.services]
                      newServices[index].suitable_for = e.target.value
                      setContent({ ...content, services: newServices })
                    }}
                  />
                </div>

                {/* Benefits Editor */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Lợi ích chính</label>
                  {(service.benefits || []).map((benefit: string, bIndex: number) => (
                    <div key={bIndex} className="flex gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) => {
                          const newServices = [...content.services]
                          newServices[index].benefits[bIndex] = e.target.value
                          setContent({ ...content, services: newServices })
                        }}
                      />
                      <Button size="icon" variant="ghost" onClick={() => {
                        const newServices = [...content.services]
                        newServices[index].benefits = newServices[index].benefits.filter((_: any, i: number) => i !== bIndex)
                        setContent({ ...content, services: newServices })
                      }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={() => {
                    const newServices = [...content.services]
                    if (!newServices[index].benefits) newServices[index].benefits = []
                    newServices[index].benefits.push("")
                    setContent({ ...content, services: newServices })
                  }}><Plus className="w-4 h-4 mr-2" /> Thêm lợi ích</Button>
                </div>

                {/* Process Editor */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Quy trình thực hiện</label>
                  {(service.process || []).map((step: string, pIndex: number) => (
                    <div key={pIndex} className="flex gap-2">
                      <Input
                        value={step}
                        onChange={(e) => {
                          const newServices = [...content.services]
                          newServices[index].process[pIndex] = e.target.value
                          setContent({ ...content, services: newServices })
                        }}
                      />
                      <Button size="icon" variant="ghost" onClick={() => {
                        const newServices = [...content.services]
                        newServices[index].process = newServices[index].process.filter((_: any, i: number) => i !== pIndex)
                        setContent({ ...content, services: newServices })
                      }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={() => {
                    const newServices = [...content.services]
                    if (!newServices[index].process) newServices[index].process = []
                    newServices[index].process.push("")
                    setContent({ ...content, services: newServices })
                  }}><Plus className="w-4 h-4 mr-2" /> Thêm bước quy trình</Button>
                </div>

                {/* Contraindications Editor */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Chống chỉ định</label>
                  {(service.contraindications || []).map((contra: string, cIndex: number) => (
                    <div key={cIndex} className="flex gap-2">
                      <Input
                        value={contra}
                        onChange={(e) => {
                          const newServices = [...content.services]
                          newServices[index].contraindications[cIndex] = e.target.value
                          setContent({ ...content, services: newServices })
                        }}
                      />
                      <Button size="icon" variant="ghost" onClick={() => {
                        const newServices = [...content.services]
                        newServices[index].contraindications = newServices[index].contraindications.filter((_: any, i: number) => i !== cIndex)
                        setContent({ ...content, services: newServices })
                      }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={() => {
                    const newServices = [...content.services]
                    if (!newServices[index].contraindications) newServices[index].contraindications = []
                    newServices[index].contraindications.push("")
                    setContent({ ...content, services: newServices })
                  }}><Plus className="w-4 h-4 mr-2" /> Thêm chống chỉ định</Button>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Sản phẩm</h2>
              <Button onClick={() => {
                const newProducts = [...content.products, {
                  id: `prod_${Date.now()}`,
                  name: "Sản phẩm mới",
                  price: "0K",
                  description: "Mô tả sản phẩm",
                  image: "/placeholder.svg",
                  ingredients: [],
                  uses: [],
                  targetAudience: [],
                  usage: "",
                  contraindications: "",
                  storage: "",
                  manufacturer: "",
                  registrationNumber: ""
                }]
                setContent({ ...content, products: newProducts })
              }}>Thêm sản phẩm</Button>
            </div>
            {content.products.map((product: any, index: number) => (
              <div key={product.id} className="p-6 border rounded-lg space-y-4 relative bg-gray-50/50">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-4 right-4"
                  onClick={() => {
                    const newProducts = content.products.filter((_: any, i: number) => i !== index)
                    setContent({ ...content, products: newProducts })
                  }}
                ><Trash2 className="w-4 h-4" /></Button>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                    <Input
                      value={product.name}
                      onChange={(e) => {
                        const newProducts = [...content.products]
                        newProducts[index].name = e.target.value
                        setContent({ ...content, products: newProducts })
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Giá</label>
                    <Input
                      value={product.price}
                      onChange={(e) => {
                        const newProducts = [...content.products]
                        newProducts[index].price = e.target.value
                        setContent({ ...content, products: newProducts })
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Hình ảnh</label>
                  <ImageUpload
                    value={product.image}
                    onUpload={(url) => {
                      const newProducts = [...content.products]
                      newProducts[index].image = url
                      setContent({ ...content, products: newProducts })
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Mô tả tóm tắt</label>
                  <Textarea
                    value={product.description}
                    onChange={(e) => {
                      const newProducts = [...content.products]
                      newProducts[index].description = e.target.value
                      setContent({ ...content, products: newProducts })
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Cách dùng</label>
                    <Textarea
                      value={product.usage}
                      onChange={(e) => {
                        const newProducts = [...content.products]
                        newProducts[index].usage = e.target.value
                        setContent({ ...content, products: newProducts })
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Chống chỉ định</label>
                    <Textarea
                      value={product.contraindications}
                      onChange={(e) => {
                        const newProducts = [...content.products]
                        newProducts[index].contraindications = e.target.value
                        setContent({ ...content, products: newProducts })
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Bảo quản</label>
                    <Input
                      value={product.storage}
                      onChange={(e) => {
                        const newProducts = [...content.products]
                        newProducts[index].storage = e.target.value
                        setContent({ ...content, products: newProducts })
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Số công bố</label>
                    <Input
                      value={product.registrationNumber}
                      onChange={(e) => {
                        const newProducts = [...content.products]
                        newProducts[index].registrationNumber = e.target.value
                        setContent({ ...content, products: newProducts })
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nhà sản xuất</label>
                  <Input
                    value={product.manufacturer}
                    onChange={(e) => {
                      const newProducts = [...content.products]
                      newProducts[index].manufacturer = e.target.value
                      setContent({ ...content, products: newProducts })
                    }}
                  />
                </div>

                {/* Ingredients Editor */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Thành phần</label>
                  {(product.ingredients || []).map((ingredient: string, iIndex: number) => (
                    <div key={iIndex} className="flex gap-2">
                      <Input
                        value={ingredient}
                        onChange={(e) => {
                          const newProducts = [...content.products]
                          newProducts[index].ingredients[iIndex] = e.target.value
                          setContent({ ...content, products: newProducts })
                        }}
                      />
                      <Button size="icon" variant="ghost" onClick={() => {
                        const newProducts = [...content.products]
                        newProducts[index].ingredients = newProducts[index].ingredients.filter((_: any, i: number) => i !== iIndex)
                        setContent({ ...content, products: newProducts })
                      }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={() => {
                    const newProducts = [...content.products]
                    if (!newProducts[index].ingredients) newProducts[index].ingredients = []
                    newProducts[index].ingredients.push("")
                    setContent({ ...content, products: newProducts })
                  }}><Plus className="w-4 h-4 mr-2" /> Thêm thành phần</Button>
                </div>

                {/* Uses Editor */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Công dụng</label>
                  {(product.uses || []).map((use: string, uIndex: number) => (
                    <div key={uIndex} className="flex gap-2">
                      <Input
                        value={use}
                        onChange={(e) => {
                          const newProducts = [...content.products]
                          newProducts[index].uses[uIndex] = e.target.value
                          setContent({ ...content, products: newProducts })
                        }}
                      />
                      <Button size="icon" variant="ghost" onClick={() => {
                        const newProducts = [...content.products]
                        newProducts[index].uses = newProducts[index].uses.filter((_: any, i: number) => i !== uIndex)
                        setContent({ ...content, products: newProducts })
                      }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={() => {
                    const newProducts = [...content.products]
                    if (!newProducts[index].uses) newProducts[index].uses = []
                    newProducts[index].uses.push("")
                    setContent({ ...content, products: newProducts })
                  }}><Plus className="w-4 h-4 mr-2" /> Thêm công dụng</Button>
                </div>

                {/* Target Audience Editor */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Đối tượng sử dụng</label>
                  {(product.targetAudience || []).map((target: string, tIndex: number) => (
                    <div key={tIndex} className="flex gap-2">
                      <Input
                        value={target}
                        onChange={(e) => {
                          const newProducts = [...content.products]
                          newProducts[index].targetAudience[tIndex] = e.target.value
                          setContent({ ...content, products: newProducts })
                        }}
                      />
                      <Button size="icon" variant="ghost" onClick={() => {
                        const newProducts = [...content.products]
                        newProducts[index].targetAudience = newProducts[index].targetAudience.filter((_: any, i: number) => i !== tIndex)
                        setContent({ ...content, products: newProducts })
                      }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={() => {
                    const newProducts = [...content.products]
                    if (!newProducts[index].targetAudience) newProducts[index].targetAudience = []
                    newProducts[index].targetAudience.push("")
                    setContent({ ...content, products: newProducts })
                  }}><Plus className="w-4 h-4 mr-2" /> Thêm đối tượng</Button>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="banner">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-bold">Banner Dịch vụ Tiêu biểu</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                <Input
                  value={content.featuredService.title}
                  onChange={(e) => updateField("featuredService", "title", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Thương hiệu (Brand)</label>
                <Input
                  value={content.featuredService.brand}
                  onChange={(e) => updateField("featuredService", "brand", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phụ đề (Subtitle)</label>
              <Input
                value={content.featuredService.subtitle}
                onChange={(e) => updateField("featuredService", "subtitle", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả tóm tắt</label>
              <Textarea
                value={content.featuredService.description}
                onChange={(e) => updateField("featuredService", "description", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hình ảnh Banner</label>
              <ImageUpload
                value={content.featuredService.bannerImage}
                onUpload={(url) => updateField("featuredService", "bannerImage", url)}
              />
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-bold">Thông tin chi tiết</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả đầy đủ</label>
                <Textarea
                  value={content.featuredService.details.fullDescription}
                  onChange={(e) => {
                    const newDetails = { ...content.featuredService.details, fullDescription: e.target.value }
                    updateField("featuredService", "details", newDetails)
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cách dùng</label>
                  <Textarea
                    value={content.featuredService.details.usage}
                    onChange={(e) => {
                      const newDetails = { ...content.featuredService.details, usage: e.target.value }
                      updateField("featuredService", "details", newDetails)
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Chống chỉ định</label>
                  <Textarea
                    value={content.featuredService.details.contraindications}
                    onChange={(e) => {
                      const newDetails = { ...content.featuredService.details, contraindications: e.target.value }
                      updateField("featuredService", "details", newDetails)
                    }}
                  />
                </div>
              </div>
              
              {/* Ingredients List */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Thành phần</label>
                {content.featuredService.details.ingredients.map((item: string, i: number) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newIngredients = [...content.featuredService.details.ingredients]
                        newIngredients[i] = e.target.value
                        const newDetails = { ...content.featuredService.details, ingredients: newIngredients }
                        updateField("featuredService", "details", newDetails)
                      }}
                    />
                    <Button size="icon" variant="ghost" onClick={() => {
                      const newIngredients = content.featuredService.details.ingredients.filter((_: any, idx: number) => idx !== i)
                      const newDetails = { ...content.featuredService.details, ingredients: newIngredients }
                      updateField("featuredService", "details", newDetails)
                    }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={() => {
                  const newIngredients = [...content.featuredService.details.ingredients, ""]
                  const newDetails = { ...content.featuredService.details, ingredients: newIngredients }
                  updateField("featuredService", "details", newDetails)
                }}><Plus className="w-4 h-4 mr-2" /> Thêm thành phần</Button>
              </div>

              {/* Benefits List */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Lợi ích</label>
                {content.featuredService.details.benefits.map((item: string, i: number) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newBenefits = [...content.featuredService.details.benefits]
                        newBenefits[i] = e.target.value
                        const newDetails = { ...content.featuredService.details, benefits: newBenefits }
                        updateField("featuredService", "details", newDetails)
                      }}
                    />
                    <Button size="icon" variant="ghost" onClick={() => {
                      const newBenefits = content.featuredService.details.benefits.filter((_: any, idx: number) => idx !== i)
                      const newDetails = { ...content.featuredService.details, benefits: newBenefits }
                      updateField("featuredService", "details", newDetails)
                    }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={() => {
                  const newBenefits = [...content.featuredService.details.benefits, ""]
                  const newDetails = { ...content.featuredService.details, benefits: newBenefits }
                  updateField("featuredService", "details", newDetails)
                }}><Plus className="w-4 h-4 mr-2" /> Thêm lợi ích</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-bold">Cài đặt tài khoản</h2>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Mật khẩu hiện tại</label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Mật khẩu mới</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleChangePassword} 
                disabled={changingPassword}
              >
                {changingPassword ? "Đang cập nhật..." : "Đổi mật khẩu"}
              </Button>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-xl font-bold mb-4">Chế độ nâng cao (JSON)</h2>
              <p className="text-sm text-muted-foreground mb-4">Sửa trực tiếp file cấu hình JSON bên dưới.</p>
              <Textarea
                className="font-mono h-[300px]"
                value={JSON.stringify(content, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value)
                    setContent(parsed)
                  } catch (err) {
                    // Đang gõ, chưa valid JSON
                  }
                }}
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Liên hệ</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại chính</label>
                <Input
                  value={content.contact.phone}
                  onChange={(e) => updateField("contact", "phone", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại phụ</label>
                <Input
                  value={content.contact.phoneSecondary}
                  onChange={(e) => updateField("contact", "phoneSecondary", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <Input
                value={content.contact.address}
                onChange={(e) => updateField("contact", "address", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chi tiết địa chỉ</label>
              <Input
                value={content.contact.addressDetails}
                onChange={(e) => updateField("contact", "addressDetails", e.target.value)}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
