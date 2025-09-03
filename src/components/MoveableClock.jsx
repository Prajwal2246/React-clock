import React from "react";
import Clock from "./Clock";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const MoveableClock = () => {
  //starting pos of clock :x,y
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [showContextMenu,setShowContextMenu] = useState(false);
  

  //track the moving clock pos
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  //mousedown event
  const onMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      /*
            - e.clientX and e.clientY are the mouse's current position on the screen 
            - pos.x and pos.y are the current position of the element you're dragging.
            - x: e.clientX - pos.x → "How far (horizontally) the mouse is from the element's left edge"
            - y: e.clientY - pos.y → "How far (vertically) the mouse is from the element's top edge"
            - e.clientX - pos.x means:"From the current mouse X position, subtract the element's current X position."
            */
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    e.preventDefault();
  };

  //mouse move event
  const onMouseMove=(e)=>{
    if(!dragging.current) return;
    e.preventDefault();
    setPos({
        x: e.clientX-offset.current.x,
        y: e.clientY-offset.current.y,
    });
  };

  //endrag event
  const  endDrag=()=>{
    dragging.current = false;
  };

  useEffect(()=>{
    window.addEventListener("mouseup",endDrag);
    return ()=>{
        window.removeEventListener("mouseup",endDrag);
    }
  },[])

  return (
    <div 
    onMouseMove={onMouseMove}
    style={{
        width:'100vw',
        height:'100vh',
        position:"relative"
    }}
    >
      <div 
      onMouseDown={onMouseDown}
      style={{
        position:"absolute",
        top:pos.y,
        left:pos.x,
        cursor:dragging.current?"grabbing":"grab",
        userSelect:"none"
      }}
      >
        <Clock />
      </div>
    </div>
  );
};

export default MoveableClock;
