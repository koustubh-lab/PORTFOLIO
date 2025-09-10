import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import axios from "axios"
import { ExternalLink, Mail, MoveLeft, MoveRight, Send } from "lucide-react"
import { useState } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { toast } from "sonner"
import BackgroundCanvas from "./components/BackgroundCanvas"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import useLenis from "./components/useLenis"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  useLenis()

  const handleContactInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { name, email, message, subject } = contactForm
      const response = await axios.post("/api/send-email", {
        to: "logsy.app@gmail.com",
        subject,
        text: message,
        name,
        email,
      })

      const { success } = response.data
      toast.info(success ? "✅ Email sent!" : "❌ Failed to send email")
    } catch {
      toast.error("❌ Error sending email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background relative overflow-hidden dark">
      <BackgroundCanvas />

      <div className="absolute inset-0 z-5 bg-background/5"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="sticky top-0 left-0 p-3 border-b">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="font-bold text-2xl text-primary">KK</div>
            <div className="hidden md:flex space-x-8 ">
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-foreground hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-foreground hover:text-primary transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>

          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-lg custom-mobile-navbar-animation">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <button
                  className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <a
                  href="#about"
                  className=" text-2xl text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#projects"
                  className=" text-2xl text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  className=" text-2xl text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skills
                </a>
                <a
                  href="#contact"
                  className=" text-2xl text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </header>

        <section className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl sm:text-8xl text-foreground mb-8 leading-tight tracking-tighter">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
                Koustubh Karande
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/Koustubh_Karande_Java.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="relative z-[-1] sm:z-0 px-6 py-2 rounded-xl border-indigo-500/50 border-2 bg-indigo-500/30
                            shadow-lg overflow-hidden hover:shadow-xl
                            focus:outline-none focus:ring-2 text-lg view-resume-button-animation"
                >
                  View Resume
                </button>
              </a>

              <a href="#projects">
                <Button
                  variant="link"
                  size="lg"
                  className="px-8 py-3 text-lg transition-transform text-indigo-500"
                >
                  Browse Projects
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section
        id="about"
        className="relative z-10 px-6 py-20 bg-background/80 backdrop-blur-sm min-h-screen grid place-content-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-5xl text-foreground mb-12 lg:mb-20">
            About Me
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed mb-6 lg:mb-12 max-w-2xl mx-auto">
            I'm a passionate full-stack developer with expertise in React, Java,
            and modern web technologies. I love creating immersive digital
            experiences that combine beautiful design with powerful
            functionality.
          </p>
          <p className="text-2xl text-muted-foreground leading-relaxed lg:mb-20 max-w-2xl mx-auto">
            When I'm not coding, you'll find me exploring new technologies,
            contributing to open source projects, or experimenting with 3D
            graphics and animations.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative z-10 px-6 py-20 bg-card/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className=" font-bold text-4xl text-foreground text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-indigo-500/50 hover:border-indigo-500 duration-300 transition-all group">
              <div className="flex flex-col h-full">
                <div className="h-48 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/logsy-image.webp"
                    alt=""
                    className="rounded-md aspect-video object-cover group-hover:opacity-50"
                  />
                </div>
                <h3 className=" font-bold text-xl mb-2 text-foreground">
                  Logsy
                </h3>
                <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                  Full-stack blogging platform specially for developers with
                  Passwordless authentication using Magic Link.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    React
                  </span>
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    Spring Boot
                  </span>
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    Supabase
                  </span>
                </div>
                <a href="https://www.logsy.site" target="_blank">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/50 text-indigo-500 hover:text-white transition-colors duration-300"
                  >
                    Visit <ExternalLink size={16} />
                  </Button>
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-indigo-500/50 hover:border-indigo-500 duration-300 transition-all group">
              <div className="flex flex-col h-full">
                <div className="h-48 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/promptify-image.webp"
                    alt=""
                    className="rounded-md aspect-video object-cover group-hover:opacity-50"
                  />
                </div>
                <h3 className=" font-bold text-xl mb-2 text-foreground">
                  Promptify
                </h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  Advanced Chatbot built with React, Node.js, and Google Gemini
                  API.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    ReactJS
                  </span>
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    NodeJS
                  </span>
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    Google Gemini API
                  </span>
                </div>
                <a href="https://promptifyy.netlify.app/" target="_blank">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/50 text-indigo-500 hover:text-white transition-colors duration-300"
                  >
                    Visit <ExternalLink size={16} />
                  </Button>
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-indigo-500/50 hover:border-indigo-500 duration-300 transition-all group">
              <div className="flex flex-col h-full">
                <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/ultrashort-image.webp"
                    alt=""
                    className="rounded-md aspect-video object-cover group-hover:opacity-50"
                  />
                </div>
                <h3 className=" font-bold text-xl mb-2 text-foreground">
                  Ultra Short
                </h3>
                <p className=" text-muted-foreground mb-4 flex-1">
                  A web application to shorten long URLs into shorter and more
                  memorable ones. Built with React.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    React
                  </span>
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    Shadcn UI
                  </span>
                  <span className="px-2 py-1 bg-indigo-500/20 cursor-default backdrop-blur-lg border border-indigo-500/30 text-primary text-xs rounded-full">
                    MongoDB
                  </span>
                </div>
                <a href="https://ultrashort.vercel.app" target="_blank">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/50 text-indigo-500 hover:text-white transition-colors duration-300"
                  >
                    Visit <ExternalLink size={16} />
                  </Button>
                </a>
              </div>
            </Card>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="w-full mt-8 ">
                View All Projects
              </Button>
            </DialogTrigger>
            <DialogContent className="h-screen sm:max-w-[900px] sm:h-auto auto-rows-min border-indigo-500/50">
              <DialogHeader>
                <DialogTitle>More Projects</DialogTitle>
                <DialogDescription>
                  Here are some other projects I built.
                </DialogDescription>
              </DialogHeader>
              <div className="p-3 bg-white/10 border rounded-md flex gap-2 justify-center">
                <MoveLeft /> Projects coming soon <MoveRight />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="relative z-10 px-6 py-20 bg-background/80 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className=" font-bold text-4xl text-foreground text-center mb-12">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className=" font-bold text-2xl text-foreground mb-4">
                Technical Skills
              </h3>

              <div className="space-y-4">
                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className=" font-medium text-foreground">
                      React & Next.js
                    </span>
                    <span className=" text-sm text-primary">95%</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-cyan-500 h-2 rounded-full w-[95%] transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-primary/50"></div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className=" font-medium text-foreground">
                      Java & Spring Boot
                    </span>
                    <span className=" text-sm text-primary">90%</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full w-[90%] transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-primary/50"></div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className=" font-medium text-foreground">
                      TypeScript
                    </span>
                    <span className=" text-sm text-primary">88%</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-primary h-2 rounded-full w-[88%] transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className=" font-medium text-foreground">
                      Database Design
                    </span>
                    <span className=" text-sm text-primary">85%</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[85%] transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className=" font-bold text-2xl text-foreground mb-4">
                Tools & Platforms
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="group p-4 bg-card/40 backdrop-blur-sm border border-indigo-500/30 bg-indigo-500/10 rounded-lg hover:border-indigo-500 transition-all hover:scale-105 cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                      <span className="text-primary text-xl">🐳</span>
                    </div>
                    <h4 className=" font-medium text-foreground text-sm">
                      Docker
                    </h4>
                  </div>
                </div>

                <div className="group p-4 bg-card/40 backdrop-blur-sm border border-indigo-500/30 bg-indigo-500/10 rounded-lg hover:border-indigo-500 transition-all hover:scale-105 cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                      <span className="text-primary text-xl">☁️</span>
                    </div>
                    <h4 className=" font-medium text-foreground text-sm">
                      AWS
                    </h4>
                  </div>
                </div>

                <div className="group p-4 bg-card/40 backdrop-blur-sm border border-indigo-500/30 bg-indigo-500/10 rounded-lg hover:border-indigo-500 transition-all hover:scale-105 cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                      <span className="text-primary text-xl">🐙</span>
                    </div>
                    <h4 className=" font-medium text-foreground text-sm">
                      Git
                    </h4>
                  </div>
                </div>

                <div className="group p-4 bg-card/40 backdrop-blur-sm border border-indigo-500/30 bg-indigo-500/10 rounded-lg hover:border-indigo-500 transition-all hover:scale-105 cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                      <span className="text-primary text-xl">🚀</span>
                    </div>
                    <h4 className=" font-medium text-foreground text-sm">
                      CI/CD
                    </h4>
                  </div>
                </div>

                <div className="group p-4 bg-card/40 backdrop-blur-sm border border-indigo-500/30 bg-indigo-500/10 rounded-lg hover:border-indigo-500 transition-all hover:scale-105 cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                      <span className="text-primary text-xl">📊</span>
                    </div>
                    <h4 className=" font-medium text-foreground text-sm">
                      Analytics
                    </h4>
                  </div>
                </div>

                <div className="group p-4 bg-card/40 backdrop-blur-sm border border-indigo-500/30 bg-indigo-500/10 rounded-lg hover:border-indigo-500 transition-all hover:scale-105 cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                      <span className="text-primary text-xl">🎨</span>
                    </div>
                    <h4 className=" font-medium text-foreground text-sm">
                      Design
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative z-10 px-6 py-20 bg-card/20 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className=" font-bold text-4xl text-foreground text-center mb-12">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className=" font-bold text-2xl text-foreground mb-6">
                Let's Connect
              </h3>
              <p className=" text-muted-foreground mb-6">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary">
                      <Mail size={20} />
                    </span>
                  </div>
                  <span className=" text-foreground">
                    karandekoustubh9@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary">
                      <FaLinkedin size={20} />
                    </span>
                  </div>
                  <span className=" text-foreground">
                    linkedin.com/in/koustubhkarandedev
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary">
                      <FaGithub size={20} />
                    </span>
                  </div>
                  <span className=" text-foreground">
                    github.com/koustubh-lab
                  </span>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
              <form className="space-y-4">
                <div>
                  <label className=" text-sm font-medium text-foreground block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 bg-transparent border border-primary/20 rounded-lg focus:border-primary/40 focus:outline-none text-foreground"
                    placeholder="Your name"
                    onChange={handleContactInputChange}
                  />
                </div>
                <div>
                  <label className=" text-sm font-medium text-foreground block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 bg-transparent border border-primary/20 rounded-lg focus:border-primary/40 focus:outline-none text-foreground"
                    placeholder="your.email@example.com"
                    onChange={handleContactInputChange}
                  />
                </div>
                <div>
                  <label className=" text-sm font-medium text-foreground block mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-3 py-2 bg-transparent border border-primary/20 rounded-lg focus:border-primary/40 focus:outline-none text-foreground"
                    placeholder="Enter a subject"
                    onChange={handleContactInputChange}
                  />
                </div>
                <div>
                  <label className=" text-sm font-medium text-foreground block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    className="w-full px-3 py-2 bg-transparent border border-primary/20 rounded-lg focus:border-primary/40 focus:outline-none text-foreground resize-none"
                    placeholder="Your message..."
                    onChange={handleContactInputChange}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={
                    "w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/50 text-indigo-500 hover:text-white transition-colors duration-300 " +
                    (loading
                      ? "pointer-events-none opacity-50 cursor-default"
                      : "")
                  }
                  onClick={handleSendEmail}
                >
                  {loading ? "Sending..." : "Send Message"}{" "}
                  {!loading && <Send size={16} />}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
