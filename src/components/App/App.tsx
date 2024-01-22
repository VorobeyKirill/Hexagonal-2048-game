import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Board } from "../Board/Board";
import { GameSettings } from "../GameSettings/GameSettings";
import { BOARD_RADIUS } from "../../types.global";

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isGameValid = useMemo(() => {
    const gameBoardRadius = Number(searchParams.get('radius'));
    const isGameBoardRadiusValid = gameBoardRadius >= BOARD_RADIUS.MIN && gameBoardRadius <= BOARD_RADIUS.MAX;

    return searchParams.get('hostname') && isGameBoardRadiusValid;
  }, [searchParams])

  return (
    <>
      {
        isGameValid ?
        <Board
          radius={Number(searchParams.get('radius'))}
          hostname={searchParams.get('hostname') as string}
          port={searchParams.get('port') || ''}
        />
        :
        <GameSettings setSearchParams={setSearchParams} />
      }
    </>
  );
}
