import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Statue
const loader = new GLTFLoader()

let model
loader.load('./statue.gltf', (gltf) => {
    model = gltf.scene
    model.position.y = 0.04

    scene.add(model)
})

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
const directionalLight = new THREE.DirectionalLight(0xC99B74, 4)
directionalLight.position.set(1, 1, 1)

const dLight = new THREE.DirectionalLight(0x3F6B7A, 4)
dLight.position.set(-1, 1, -1)

scene.add(dLight)

scene.add(ambientLight, directionalLight)

// Cursor
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (mm) => {
    mouse.x = mm.clientX / sizes.width * 2 - 1
    mouse.y = -(mm.clientY / sizes.height) * 2 + 1
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Check
    if(hideMediaQuery.matches){
        let first = document.getElementById('first')
        let hide = document.getElementById('hid')
        let hida = document.getElementById('hida')
    
        first.addEventListener('click', () => {
            hide.classList.add('hide')
            hida.classList.add('hide')
        })
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false

// hide
const hideMediaQuery = window.matchMedia('(min-width: 1025px)')

if(hideMediaQuery.matches){
    let first = document.getElementById('first')
    let hide = document.getElementById('hid')
    let hida = document.getElementById('hida')

    first.addEventListener('click', () => {
        hide.classList.add('hide')
        hida.classList.add('hide')
    })
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Animate Statue
    if(model){
        model.rotation.y = elapsedTime * 0.5
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()