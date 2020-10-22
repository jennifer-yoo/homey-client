import React, { useState } from 'react';
//, useRef, Suspense 
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { useProgress, useGLTFLoader } from "drei";
// import { Canvas,extend,useThree,useFrame, useLoader} from "react-three-fiber";
// import { a, useTransition } from "@react-spring/web";


// function Model({url}) { //LOADING GLTF FILE FROM PUBLIC FOLDER
//     const gltf = useLoader(GLTFLoader, url)

//     return <primitive object={gltf.scene} position={[0, -10, 10]} />
// }

// function Loader() {
//     const { active, progress } = useProgress();
//     const transition = useTransition(active, {
//         from: { opacity: 1, progress: 0 },
//         leave: { opacity: 0 },
//         update: { progress },
//     });
//     return transition(
//         ({ progress, opacity }, active) =>
//         active && (
//             <a.div className='loading' style={{ opacity }}>
//             <div className='loading-bar-container'>
//                 <a.div className='loading-bar' style={{ width: progress }}></a.div>
//             </div>
//             </a.div>
//         )
//     );
// }

// extend({ OrbitControls })
// const Controls = () => {
//     const { camera, gl: {domElement} } = useThree()
//     const controls = useRef()
//     useFrame(state => controls.current.update())

//     return (
//         <orbitControls ref={controls} args={[camera,domElement]} target={[0, 10, 0]}/>
//     )
// }

// const Lights = () => {
//     return (
//     <>
//         {/* Ambient Light illuminates lights for all objects */}
//         <ambientLight intensity={0.3} />
//         {/* Diretion light */}
//         <directionalLight position={[5, 5, 5]} intensity={0.5} />
//         <directionalLight
//         castShadow
//         position={[0, 10, 0]}
//         intensity={1.5}
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//         shadow-camera-far={50}
//         shadow-camera-left={-10}
//         shadow-camera-right={10}
//         shadow-camera-top={10}
//         shadow-camera-bottom={-10}
//         />
//         {/* Spotlight Large overhead light */}
//         <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
//     </>
//     );
// };


// function Render({url}) {
//     return (
//         <div className="3d-show" style={{width: "500px", height: "500px", border: "black"}}>
//             <Canvas 
//                 concurrent
//                 colorManagement
//                 gl={{ setSize: [500, 500]}}
//                 camera={{ position: [0, 40, 90], fov: 70}}>
//                     <Lights />
//                     <Suspense fallback={null}>
//                         <Model url={url}  />
//                     </Suspense>
//                     <Controls />
//             </Canvas>               
//             <Loader/>
//         </div>
//     )
// }

function FurnitureShow(props) {

    const [quantity, setQuantity] = useState(1);

    const changeHandler = (event) => {
        event.persist()
        event.preventDefault()
        setQuantity(event.target.value)
    }

    const { info, addToCart } = props
    return (
        <div className="show-card">
            {info ? 
                <div className="show-info">
                    <div className="3d-container" dangerouslySetInnerHTML={{__html: info.threeD}}>
                    </div>
                    <div className="text-info">
                        <p className="text-name">{info.name}</p>
                        <p>${info.price}</p>
                        <p>Color: {info.color}</p>
                        <p>{info.description}</p>
                        <form className="add-form" onSubmit={(event) => addToCart(info, event, quantity)}>
                            <label htmlFor="quantity">Quantity:</label>
                            <input id="quantity" name="quantity" type="number" min="1" max="3" value={quantity} onChange={(event) => changeHandler(event)}/>
                            <button className="add-cart-btn" type="submit">Add to Cart</button>
                        </form>
                    </div>
                </div>
            : 
            null
            }
        </div>
    )
}


export default FurnitureShow;