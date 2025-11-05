import { useLoader } from "./LoaderContext";
import { useState,useEffect } from "react";
import { setGlobalLoadingFn } from "../../services/Api";

export default function LoaderConnector() {
  const { setLoading } = useLoader();

  useEffect(() => {
    setGlobalLoadingFn(setLoading);
  }, [setLoading]);

  return null;
}


