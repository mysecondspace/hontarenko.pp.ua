import React, { useEffect, useRef } from 'react'
import { gsap, Circ } from 'gsap'

import styles from './styles.module.scss'

export const Constellation = () => {
  const constellationRef = useRef(null)
  const animateHeaderRef = useRef(true)
  const canvasRef = useRef(null)
  const pointsRef = useRef([])
  const targetRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  })

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const dots =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? 10
        : 15

    const constellation = constellationRef.current

    constellation.style.height = `${height}px`

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const points = []

    canvas.width = width
    canvas.height = height

    for (let x = 0; x < width; x += width / dots) {
      for (let y = 0; y < height; y += height / dots) {
        const px = x + (Math.random() * width) / dots
        const py = y + (Math.random() * height) / dots
        const p = { x: px, originX: px, y: py, originY: py }

        points.push(p)
      }
    }

    points.forEach((p1) => {
      const closest = []

      points.forEach((p2) => {
        if (p1 !== p2) {
          let placed = false

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (!closest[k]) {
                closest[k] = p2
                placed = true
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2
                placed = true
              }
            }
          }
        }
      })

      p1.closest = closest
    })

    points.forEach((p) => {
      const c = new Circle(p, 2 + Math.random() * 2, 'rgb(84, 91, 112)')

      p.circle = c
    })

    pointsRef.current = points
    initAnimation(ctx, points)

    const mouseMove = (e) => {
      const posx =
        e.pageX ||
        e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft
      const posy =
        e.pageY ||
        e.clientY + document.body.scrollTop + document.documentElement.scrollTop

      targetRef.current = { x: posx, y: posy }
    }

    const scrollCheck = () => {
      animateHeaderRef.current = document.body.scrollTop <= height
    }

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      constellation.style.height = `${height}px`
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('scroll', scrollCheck)
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('scroll', scrollCheck)
      window.removeEventListener('resize', resize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initAnimation = (ctx, points) => {
    const animate = () => {
      if (animateHeaderRef.current) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        points.forEach((p) => {
          if (Math.abs(getDistance(targetRef.current, p)) < 4000) {
            p.active = 0.3
            p.circle.active = 0.6
          } else if (Math.abs(getDistance(targetRef.current, p)) < 20000) {
            p.active = 0.1
            p.circle.active = 0.3
          } else if (Math.abs(getDistance(targetRef.current, p)) < 40000) {
            p.active = 0.02
            p.circle.active = 0.1
          } else {
            p.active = 0
            p.circle.active = 0
          }

          drawLines(ctx, p)
          p.circle.draw(ctx)
        })
      }

      requestAnimationFrame(animate)
    }

    animate()
    points.forEach((p) => shiftPoint(p))
  }

  const shiftPoint = (p) => {
    gsap.to(p, {
      duration: 1 + 1 * Math.random(),
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: () => shiftPoint(p),
    })
  }

  const drawLines = (ctx, p) => {
    if (!p.active) return

    p.closest.forEach((c) => {
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(c.x, c.y)
      ctx.strokeStyle = `rgba(84, 91, 112, ${p.active})`
      ctx.stroke()
    })
  }

  const getDistance = (p1, p2) => {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
  }

  class Circle {
    constructor(pos, rad, color) {
      this.pos = pos
      this.radius = rad
      this.color = color
    }

    draw(ctx) {
      if (!this.active) return

      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false)
      ctx.fillStyle = `rgba(84, 91, 112, ${this.active})`
      ctx.fill()
    }
  }

  return (
    <div ref={constellationRef} className={styles.constellation}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
