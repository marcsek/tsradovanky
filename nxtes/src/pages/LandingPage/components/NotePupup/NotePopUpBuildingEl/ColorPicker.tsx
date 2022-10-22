import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ColorPickButton from "../../../../../custom-material-styles/ColorPickButton";
import { ElementColors } from "../../../types";
import { cBallScaleVariant } from "../NotePopupAnimations";

const colors = Object.values(ElementColors);

interface ColorPickerProps {
  selectedColor: ElementColors;
  setSelectedColor: (color: ElementColors) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, setSelectedColor }) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {colors.map((color, index) => (
        <ColorPickButton
          key={index}
          shouldBePicked={selectedColor === color}
          represColor={color}
          sx={{
            padding: "12px",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
          variant="outlined"
          onClick={() => {
            setSelectedColor(color);
          }}
        >
          <Box
            component={motion.div}
            animate="scaleUp"
            variants={cBallScaleVariant}
            custom={selectedColor === color}
            sx={{
              backgroundColor: color,
              height: "15px",
              width: "15px",
              borderRadius: "15px",
              boxShadow: selectedColor === color ? `${color}66 -2px 4px 8px 0px` : "",
            }}
          ></Box>
        </ColorPickButton>
      ))}
    </Stack>
  );
};

export default ColorPicker;
