import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import ThreeGlobe from 'three-globe';
import './styles.css';
import cloudsImage from './fair_clouds_4k.png';

const GlobeViz = () => {
  const globeContainerRef = useRef(null);

  useEffect(() => {
    const Globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');

    const CLOUDS_IMG_URL = cloudsImage;
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.06; // deg/frame

    const Clouds = new THREE.Mesh(
      new THREE.SphereGeometry(Globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75)
    );

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      Clouds.material = new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true });
    });

    Globe.add(Clouds);

    // Rotate clouds
    (function rotateClouds() {
      Clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
      requestAnimationFrame(rotateClouds);
    })();

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    globeContainerRef.current.appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 500;

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement);
    tbControls.noZoom = true;
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    const GLOBE_ROTATION_SPEED = 0.005; // Speed of the globe rotation

    // Kick-off renderer
    (function animate() {
      Globe.rotation.y += GLOBE_ROTATION_SPEED; // Rotate the globe

      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div id="globeViz" ref={globeContainerRef} />;
};

export default GlobeViz;
