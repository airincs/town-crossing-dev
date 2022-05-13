import React, { FC } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import Planet from "../../PlanetUpdated";
import { OrbitControls } from "@react-three/drei";

const ReactThreeFiber: FC = () => {
  return (
    <Canvas>
      <OrbitControls autoRotate={true} />
      <directionalLight intensity={1.5} />
      <ambientLight intensity={0.3} />
      <Planet />
    </Canvas>
  );
};
export default ReactThreeFiber;
