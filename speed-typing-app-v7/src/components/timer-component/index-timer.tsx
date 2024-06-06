//TODO: This component might be modified. I want to have a central timer that instead of using the
//      time in the state it has a counter, and implements the changes in time without modifying the state

import { memo, useContext, useEffect, useRef, useState } from "react";
import { SpeedTypeContext } from "../../general-store/context-provider";
import { ValidGameModes } from "../../types";
type TimerComponentPropType = {
  finishGame: () => void;
};

const TimerComponent = memo(
  ({
    // The idea of recieving the timeInterval as props does not seem so correct now.
    // The reason for the change is that the "Start Game" button can be used to update the
    // state with the values provided by the user. This timer can read the timeInterval
    // from the value in the state. That will simplify passing the information from the user
    // selection to this component, otherwise I might need to implement some useState on the
    // index-game-view which will be against the idea of centralize the state
    finishGame,
  }: TimerComponentPropType) => {
    const state = useContext(SpeedTypeContext);

    const [timer, setTimer] = useState(state?.timeInterval as number);
    const [gameMode, setGameMode] = useState<ValidGameModes>("option1");

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
      // Now this logic is called upon changes in state?.winnerModal and not the initial renders.
      if (state?.winnerModal) {
        // The initial state for --->state?.winnerModal<--- is false, when that value
        // is true then the game has not finished
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
      } else {
        // Only the "current" field is update, not the intervalRef
        intervalRef.current = setInterval(() => {
          if (gameMode === "option2") {
            setTimer((prevTime) => prevTime + 1);
          } else {
            setTimer((prevTime) => prevTime - 1);
          }
        }, 100);
      } //TODO: Change to seconds or miliseconds after first test
      return () =>
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
      // return () => clearInterval(countDown);
    }, [state?.winnerModal]);

    useEffect(() => {
      if ((timer as number) <= 0 && gameMode === "option1") {
        finishGame();
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
      }
    }, [timer]);

    useEffect(() => {
      setTimer(state?.timeInterval as number);
    }, [state?.timeInterval]);

    useEffect(() => {
      setGameMode(state?.gameMode as ValidGameModes);
      if (state?.gameMode === "option2") {
        setTimer(0);
      } else {
        setTimer(state?.timeInterval as number);
      }
    }, [state?.gameMode]);

    return <h1>{state?.winnerModal ? "0" : timer}</h1>;
  }
);
export default TimerComponent;
