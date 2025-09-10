import { Canvas } from "@react-three/fiber"
import React, { Suspense } from "react"

import { Environment, Float, Html, OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import type * as THREE from "three"

const codeSnippets = [
  // React snippets
  "import React from 'react'",
  "const App = () => {",
  "  const [state, setState] = useState()",
  "  useEffect(() => {",
  "    fetchData()",
  "  }, [])",
  "  return <div>Hello World!</div>",
  "}",
  // Java snippets
  "public class Main {",
  "  public static void main(String[] args) {",
  '    System.out.println("Hello Java!");',
  "  }",
  "}",
  "@RestController",
  "public class ApiController {",
  '  @GetMapping("/api/data")',
  "  public ResponseEntity<String> getData() {",
  '    return ResponseEntity.ok("Success");',
  "  }",
  "}",
  "List<String> items = new ArrayList<>();",
  "items.stream().filter(Objects::nonNull)",
  "  .map(String::toUpperCase)",
  "  .collect(Collectors.toList());",
]

function FloatingCode({
  position,
  text,
  delay = 0,
  index,
}: {
  position: [number, number, number]
  text: string
  delay?: number
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [visible, setVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [gyroPos, setGyroPos] = useState({ x: 0, y: 0 })
  const [focused, setFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)
  const smoothedGyroPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    const triggerAnimation = () => {
      if (Math.random() < 0.3) {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 3000)
      }
    }

    const interval = setInterval(triggerAnimation, Math.random() * 8000 + 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMobile) {
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = -(event.clientY / window.innerHeight) * 2 + 1
        setMousePos({ x, y })
      }
    }

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (isMobile && event.gamma !== null && event.beta !== null) {
        const rawX = Math.max(-1, Math.min(1, (event.gamma / 12) * 2.8))
        const rawY = Math.max(-1, Math.min(1, ((event.beta - 45) / 12) * 2.8))

        const smoothingFactor = 0.15
        smoothedGyroPos.current.x +=
          (rawX - smoothedGyroPos.current.x) * smoothingFactor
        smoothedGyroPos.current.y +=
          (rawY - smoothedGyroPos.current.y) * smoothingFactor

        setGyroPos({
          x: smoothedGyroPos.current.x,
          y: smoothedGyroPos.current.y,
        })
      }
    }

    if (isMobile) {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        ;(DeviceOrientationEvent as any)
          .requestPermission()
          .then((response: string) => {
            if (response === "granted") {
              window.addEventListener(
                "deviceorientation",
                handleDeviceOrientation,
                { passive: true }
              )
            }
          })
          .catch(console.error)
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation, {
          passive: true,
        })
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("deviceorientation", handleDeviceOrientation)
    }
  }, [isMobile])

  useFrame((state) => {
    if (groupRef.current) {
      const currentPos = isMobile ? gyroPos : mousePos
      const movementIntensity = isMobile ? 3.2 : 2.5
      const targetX = position[0] - currentPos.x * movementIntensity
      const targetY = position[1] - currentPos.y * movementIntensity

      const lerpSpeed = isMobile ? 0.12 : 0.08
      groupRef.current.position.x +=
        (targetX - groupRef.current.position.x) * lerpSpeed
      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) * lerpSpeed

      // CINEMATIC FALLING MOTION
      groupRef.current.position.y -= 0.02 + Math.random() * 0.01
      if (groupRef.current.position.y < -10) {
        groupRef.current.position.y = 10
        groupRef.current.position.x = (Math.random() - 0.5) * 18
        groupRef.current.position.z = (Math.random() - 0.5) * 6
      }

      if (isAnimating) {
        setAnimationPhase(state.clock.elapsedTime * 2)
        /* groupRef.current.position.x += (Math.random() - 0.5) * 0.3
        groupRef.current.position.y += (Math.random() - 0.5) * 0.3 */
      }
    }
  })

  if (!visible) return null

  const getGradientStyle = () => {
    if (!isAnimating) return {}
    const wave1 = Math.sin(animationPhase) * 0.5 + 0.5
    const wave2 = Math.sin(animationPhase + Math.PI / 3) * 0.5 + 0.5
    const wave3 = Math.sin(animationPhase + (Math.PI * 2) / 3) * 0.5 + 0.5
    return {
      backgroundImage: `linear-gradient(45deg,
        hsl(${280 + wave1 * 40}, 70%, ${60 + wave1 * 20}%),
        hsl(${200 + wave2 * 60}, 80%, ${50 + wave2 * 30}%),
        hsl(${320 + wave3 * 30}, 75%, ${55 + wave3 * 25}%))`,
      backgroundSize: "300% 300%",
      animation: isAnimating ? "gradientWave 3s ease-in-out" : "none",
    }
  }

  return (
    <group ref={groupRef}>
      <Float
        speed={isMobile ? 0.8 : 1.5}
        rotationIntensity={isMobile ? 0.05 : 0.2}
        floatIntensity={isMobile ? 0.2 : 0.5}
      >
        <mesh
          ref={meshRef}
          position={position}
          onClick={() => setFocused(!focused)}
          onPointerOver={() => !isMobile && setFocused(true)}
          onPointerOut={() => !isMobile && setFocused(false)}
        >
          <Html
            transform
            occlude={false}
            style={{
              transition: "all 0.3s",
              opacity: focused ? 0.9 : 0.6,
              pointerEvents: "auto",
              cursor: isMobile ? "default" : "pointer",
              zIndex: 1000,
              filter: isAnimating ? "blur(1.5px)" : "none",
            }}
          >
            <div
              className={`backdrop-blur-md border rounded-lg px-3 py-2 font-mono shadow-2xl transition-all duration-300 border-indigo-500/50 ${
                focused ? "scale-110" : ""
              } ${
                isAnimating
                  ? "border-indigo-500"
                  : "bg-indigo-500/20 text-primary"
              }`}
              style={{
                fontSize: `clamp(0.7rem, 2vw, 1rem)`,
                boxShadow: focused
                  ? "0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.3)"
                  : "0 0 20px rgba(168, 85, 247, 0.3)",
                backdropFilter: "blur(12px)",
                color: isAnimating
                  ? "#ffffff"
                  : focused
                  ? "#e879f9"
                  : "#6366f1",
                textShadow: isAnimating
                  ? "0 0 15px rgba(255, 255, 255, 0.8)"
                  : "0 0 10px rgba(168, 85, 247, 0.5)",
                ...getGradientStyle(),
              }}
            >
              {text}
            </div>
          </Html>
        </mesh>
      </Float>
    </group>
  )
}

function AnimatedCodeBackground() {
  const getDistributedPosition = (
    index: number,
    total: number
  ): [number, number, number] => {
    const cols = Math.ceil(Math.sqrt(total))
    const rows = Math.ceil(total / cols)

    const col = index % cols
    const row = Math.floor(index / cols)

    const x = (col / Math.max(cols - 1, 1) - 0.5) * 18
    const y = (row / Math.max(rows - 1, 1) - 0.5) * 12
    const z = (Math.random() - 0.5) * 6

    return [x, y, z]
  }

  return (
    <>
      {codeSnippets.map((snippet, index) => (
        <FloatingCode
          key={index}
          index={index}
          position={getDistributedPosition(index, codeSnippets.length)}
          text={snippet}
          delay={index * 0.2}
        />
      ))}
    </>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#06b6d4" />
      <pointLight position={[0, 0, 15]} intensity={0.8} color="#8b5cf6" />

      <AnimatedCodeBackground />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

const BackgroundCanvas = React.memo(() => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        style={{ touchAction: "auto" }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
})

export default BackgroundCanvas
