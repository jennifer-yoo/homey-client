import React, { Component, useState, useRef, Suspense } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
// import GLTFLoader from 'three-gltf-loader';

// import { Html, useProgress, OrbitControls, draco } from "drei";
import { Canvas,extend,useThree,useFrame, useLoader} from "react-three-fiber";
import { useInView } from "react-intersection-observer";

// import GLTFLoader from 'three-gltf-loader';

// function Model({url}) {
//     console.log("model url:", url )
//     const loader = new GLTFLoader()

//     loader.load(url, (gltf) => {
//         gltf = gltf.scene
//         scene.add(gltf.scene)

//         control.attach(gltf.scene)
//     })
// }


// const Lights = () => {
//     return (
//     <>
//         {/* Ambient Light illuminates lights for all objects */}
//         <ambientLight intensity={0.3} />
//         {/* Diretion light */}
//         <directionalLight position={[10, 10, 5]} intensity={1} />
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

// // const HTMLContent = (domContent, children, modelPath) => {
// //     const ref = useRef();
// //     const [refItem] = useInView({
// //         threshold: 0,
// //     });
// //     // const useEffect(() => {
// //     //     inView && (document.body.style.background = bgColor);
// //     // }, [inView]);
// //     return (
// //         <><mesh ref={ref} position={[0, -35, 0]}>
// //             <Model url={modelPath} />
// //         </mesh>
// //         <Html fullscreen portal={domContent}>
// //             <div ref={refItem} className='container'>
// //                 <h1 className='title'>{children}</h1>
// //             </div>
// //         </Html></>
// //     );
// // };

// const Controls = () => {
//     const controls  = useRef()  
//     const {camera,gl} = useThree()

//     useFrame(() => {
//         controls.current.update()
//     })
    
//     return (
//         <OrbitControls ref={controls} autoRotate args={[camera,gl.domElement]}></OrbitControls>
//     )
// }

// function FurnitureShow(props) {

//     const [quantity, setQuantity] = useState(1);


//     const changeHandler = (event) => {
//         event.persist()
//         event.preventDefault()
//         setQuantity(event.target.value)
//     }

//     const { info, addToCart } = props
//     return (
//         <div className="show-card">
//             {info ? 
//                 <div className="show-info">
//                     <div className="3d-show">
//                     <Canvas shadowMap invalidateFrameloop camera={{ position: [0, 0, 17], far: 50 }}>
//                         {/* Lights Component */}
//                         {/* <Controls /> */}
//                         <Lights />
//                         <Suspense fallback={null}>
//                             <Model url="/armchairYellow.gltf" />
//                         </Suspense>
//                     </Canvas>               


//                     {/* <div className="sketchfab-embed-wrapper">
//                         <iframe title="A 3D model" width="640" height="480" src="https://sketchfab.com/models/de3dfc6da4b64fb3bf074ec732839bf3/embed?autostart=0&amp;ui_controls=0&amp;ui_infos=0&amp;ui_inspector=0&amp;ui_stop=0&amp;ui_watermark=0&amp;ui_watermark_link=0" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
//                     </div> */}


//                     </div>
//                     <div className="text-info">
//                         <p className="text-name">{info.name}</p>
//                         <p>${info.price}</p>
//                         <p>{info.rating} out of 5</p>
//                         <form className="add-form" onSubmit={(event) => addToCart(info, event, quantity)}>
//                             <label htmlFor="quantity">Quantity</label>
//                             <input id="quantity" name="quantity" type="number" min="1" max="3" value={quantity} onChange={(event) => changeHandler(event)}/>
//                             <button className="add-cart-btn" type="submit">Add to Cart</button>
//                         </form>
//                     </div>
//                 </div>
//             : 
//             null
//             }
//         </div>
//     )
// }


// export default FurnitureShow;





// function Model({url}) {
//     this.loader.load(url, gltf => {
//         this.gltf = gltf.scene
    
//           // ADD MODEL TO THE SCENE
//         this.scene.add(gltf.scene);
    
//           // ATTACH MODEL TO TRANSFORM CONTROL
//         this.control.attach( gltf.scene );
//                 this.scene.add( this.control );
    
//           //
//         gltf.scene.scale.set(3, 3, 3)
//         this.orbit.update();
    
//         this.renderer.render(this.scene, this.camera);
//         }, undefined,
    
//         error => {
//         console.log(error);
//         });
// }


export default class FurnitureShow extends Component {

    state = {
        quantity: 1
    }
    
    componentDidMount = () => {
        console.log("mount:", this)
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height);
        this.renderer.gammaFactor = 1.5;
        this.mount.appendChild(this.renderer.domElement);

        //ADD SCENE
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('pink');

        // ADD LOADER FROM NPM FOLDER
        this.loader = new GLTFLoader();

        // LODING GLB FILE FROM SRC FOLDER
        this.loader.load('/armchairYellow.gltf', (gltf) => {
        // this.loader.load('https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {

        let root = gltf.scene
    
        // ADD MODEL TO THE SCENE
        this.scene.add(root);
        gltf.scene.scale.set(3, 3, 3)
        this.orbit.update();
    
        this.renderer.render(this.scene, this.camera);
        }, undefined,
    
        (error) => {
            console.log(error);
        });
    
        //ADD CAMERA
        let fov = 70;
        let aspect = 1;
        let near = 0.1;
        let far = 2000;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(0, 50, 300)
        this.scene.add(this.camera)

        this.helper = new THREE.CameraHelper(this.camera)
        this.scene.add(this.helper)

        // LIGHT
        this.light = new THREE.AmbientLight;             
        this.light.intensity = 0.3; 
        this.scene.add(this.light);

        this.spotLight = new THREE.SpotLight;
        this.spotLight.position.set( 1000, 0, 0 );
        this.spotLight.castShadow = true;
        this.spotLight.intensity = 1;
        this.scene.add(this.spotLight)

        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF)
        this.directionalLight.intensity = 1;
        this.directionalLight.position.set(10, 10, 5);
        this.scene.add(this.directionalLight)
        this.scene.add(this.directionalLight.target)
    
        // ORBIT CONTROL
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.target.set(0, 60, -150);
        this.orbit.update();
    
        //EVENT LISTNER TO VIEW MODEL IN DIFFERENT POSITIONS
        this.orbit.addEventListener("change", () => this.renderer.render(this.scene, this.camera));
    };
    
    changeHandler = (event) => {
        event.persist()
        event.preventDefault()
        this.setState(()=> ({[event.target.name]: event.target.value}))
    }

    render () {
        const { info, addToCart } = this.props
        return (
            <div className="show-card">
                {info ? 
                    <div className="show-info">
                        <div
                            style={{width: "500px", height: "500px"}}
                            ref={mount => this.mount = mount}>
                            {/* <img className="show-pic" src={info.image} alt={info.name}></img> */}
                        </div> 

                        {/* <div className="sketchfab-embed-wrapper">
                            <iframe title="A 3D model" width="640" height="480" src="https://sketchfab.com/models/de3dfc6da4b64fb3bf074ec732839bf3/embed?autostart=0&amp;ui_controls=0&amp;ui_infos=0&amp;ui_inspector=0&amp;ui_stop=0&amp;ui_watermark=0&amp;ui_watermark_link=0" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                        </div> */}

                        <div className="text-info">
                            <p className="text-name">{info.name}</p>
                            <p>${info.price}</p>
                            <p>{info.rating} out of 5</p>
                            <form className="add-form" onSubmit={(event) => addToCart(info, event, this.state.quantity)}>
                                <label htmlFor="quantity">Quantity</label>
                                <input id="quantity" name="quantity" type="number" min="1" max="3" value={this.state.quantity} onChange={(event) => this.changeHandler(event)}/>
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
}