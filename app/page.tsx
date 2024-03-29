"use client"
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { beep } from '@/utils/audio';
import { Popover } from '@radix-ui/react-popover';
import { Separator } from '@radix-ui/react-separator';
import { Slider } from '@radix-ui/react-slider';
import { Camera, FlipHorizontal, MoonIcon, PersonStanding, SunIcon, Video, Volume, Volume2 } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { Rings } from 'react-loader-spinner';
import Webcam from 'react-webcam';
import { toast } from "sonner"

type Props = {}

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // state
  const [mirrored, setMirrored] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.8);
  return (
    <div className='flex h-screen'>
      {/* left division - webcam and canvas */}
      <div className='relative'>
        <div className='relative h-screen w-full'>
          <Webcam ref={webcamRef}
            mirrored={mirrored}
            className='h-screen w-full object-contain p-2' 
          />
          <canvas ref={canvasRef}
            className='absolute top-0 left-0 w-full h-full object-contain '
          ></canvas>
        </div>
      </div>
      {/* right division - controls */}
      <div className='flex flex-row flex-1'>
        <div className='border-primary/5 border-2 max-w-xs flex-col gap-2 justify-between shadow-md rounded-md p-4'>
          {/* top section */}
          <div className='flex flex-col gap-2'>
            <ModeToggle />
            <Button variant={'outline'} size={'icon'}
              onClick={() =>{
                setMirrored((prev) => !prev)
              }}
            >
              <FlipHorizontal/>
            </Button>
            <Separator className='my-2'/>
          </div>
          {/* middle section */}
          <div className='flex flex-col gap-2'>
            <Separator className='my-2'/>
            <Button
              variant={'outline'} size={'icon'}
              onClick={userPromptScreenshot}
            >
              <Camera />
            </Button>
            <Button
              variant={isRecording ? 'destructive':'outline'} size={'icon'}
              onClick={userPromptRecord}
            >
              <Video/>
            </Button>
            <Separator className='my-2'/>
            <Button
              variant={autoRecordEnabled ?'destructive':'outline'}
              size={'icon'}
              onClick={toggleAutoRecord}
            >
              {autoRecordEnabled ?<Rings color='white' height = {45}/> :<PersonStanding/>}
            </Button>
          </div>
          {/* bottom section */}
          <div className='flex flex-col gap-2'>
            <Separator className='my-2'/>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                  <Volume2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Slider
                  max={1}
                  min={0}
                  step={0.2}
                  defaultValue={[volume]}
                  onValueCommit={(val) => {
                    setVolume(val[0]);
                    beep(val[0]);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className='h-full flex-1 py-4 px-2 overflow-y-scroll'>
          <RenderFeatureHightSection/>
        </div>

      </div>
    </div>
  )
  //handler function
  function userPromptScreenshot() {
    // take picture
    //save it to the downloads
  }
  function userPromptRecord() {
    //check if recording
    //then stop recording
    //and save recording to downloads
    //if not recording
    //start recording
  }
  function toggleAutoRecord(){
    if(autoRecordEnabled){
      setAutoRecordEnabled(false);
      toast("Auto recording disabled")
    }else{
      setAutoRecordEnabled(true);
      toast("Auto recording enabled")
    }
  }
  // inner component
  function RenderFeatureHightSection(){
    return <div className="text-xs text-muted-foreground">
    <ul className="space-y-4">
      <li>
        <strong>Dark Mode/Sys Theme 🌗</strong>
        <p>Toggle between dark mode and system theme.</p>
        <Button className="my-2 h-6 w-6" variant={"outline"} size={"icon"}>
          <SunIcon size={14} />
        </Button>{" "}
        /{" "}
        <Button className="my-2 h-6 w-6" variant={"outline"} size={"icon"}>
          <MoonIcon size={14} />
        </Button>
      </li>
      <li>
        <strong>Horizontal Flip ↔️</strong>
        <p>Adjust horizontal orientation.</p>
        <Button className='h-6 w-6 my-2'
          variant={'outline'} size={'icon'}
          onClick={() => {
            setMirrored((prev) => !prev)
          }}
        ><FlipHorizontal size={14} /></Button>
      </li>
      <Separator />
      <li>
        <strong>Take Pictures 📸</strong>
        <p>Capture snapshots at any moment from the video feed.</p>
        <Button
          className='h-6 w-6 my-2'
          variant={'outline'} size={'icon'}
          onClick={userPromptScreenshot}
        >
          <Camera size={14} />
        </Button>
      </li>
      <li>
        <strong>Manual Video Recording 📽️</strong>
        <p>Manually record video clips as needed.</p>
        <Button className='h-6 w-6 my-2'
          variant={isRecording ? 'destructive' : 'outline'} size={'icon'}
          onClick={userPromptRecord}
        >
          <Video size={14} />
        </Button>
      </li>
      <Separator />
      <li>
        <strong>Enable/Disable Auto Record 🚫</strong>
        <p>
          Option to enable/disable automatic video recording whenever
          required.
        </p>
        <Button className='h-6 w-6 my-2'
          variant={autoRecordEnabled ? 'destructive' : 'outline'}
          size={'icon'}
          onClick={toggleAutoRecord}
        >
          {autoRecordEnabled ? <Rings color='white' height={30} /> : <PersonStanding size={14} />}

        </Button>
      </li>

      <li>
        <strong>Volume Slider 🔊</strong>
        <p>Adjust the volume level of the notifications.</p>
      </li>
      <li>
        <strong>Camera Feed Highlighting 🎨</strong>
        <p>
          Highlights persons in{" "}
          <span style={{ color: "#FF0F0F" }}>red</span> and other objects in{" "}
          <span style={{ color: "#00B612" }}>green</span>.
        </p>
      </li>
      <Separator />
      <li className="space-y-4">
        <strong>Share your thoughts 💬 </strong>
        <br />
        <br />
        <br />
      </li>
    </ul>
  </div>
  }
}
export default HomePage