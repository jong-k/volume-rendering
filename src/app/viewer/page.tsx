"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { init as coreInit, RenderingEngine, Enums } from "@cornerstonejs/core";
import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";

import createImageIdsAndCacheMetaData from "@/lib/createImageIdsAndCacheMetaData";

export default function ViewerPage() {
  const router = useRouter();

  const elementRef = useRef<HTMLDivElement>(null);
  const running = useRef(false);

  useEffect(() => {
    const setup = async () => {
      if (running.current || !elementRef.current) return;
      running.current = true;

      await coreInit();
      await dicomImageLoaderInit();

      const imageIds = await createImageIdsAndCacheMetaData({
        StudyInstanceUID:
          "1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463",
        SeriesInstanceUID:
          "1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561",
        wadoRsRoot: "https://d3t6nz73ql33tx.cloudfront.net/dicomweb",
      });

      const renderingEngineId = "myRenderingEngine";
      const renderingEngine = new RenderingEngine(renderingEngineId);

      const viewportId = "CT_AXIAL_STACK";

      const viewportInput = {
        viewportId,
        type: Enums.ViewportType.STACK,
        element: elementRef.current,
      };

      renderingEngine.enableElement(viewportInput);

      const viewport = renderingEngine.getStackViewport(viewportId);

      viewport.setStack(imageIds, 60);

      viewport.render();
    };
    setup();
  }, [elementRef, running]);

  return (
    <div>
      <button onClick={() => router.back()}>뒤로가기</button>
      <h2>뷰어 페이지</h2>
      <div
        ref={elementRef}
        style={{ width: "500px", height: "500px", background: "gray" }}
      ></div>
    </div>
  );
}
