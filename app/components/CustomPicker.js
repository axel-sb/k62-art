import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import React, { useMemo } from "react";
import { RgbaStringColorPicker } from "react-colorful";

// Color converter https://github.com/omgovich/colord
extend([ namesPlugin ]);

export const CustomPicker = ({ color, ...rest }) => {
  const rgbaString = useMemo(() => {
    return color.startsWith("rbga") ? color : colord(color).toHsl();
  }, [ color ]);

  return <RgbaStringColorPicker color={rgbaString} {...rest} />;
};
