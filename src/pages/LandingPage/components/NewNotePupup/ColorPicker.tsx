import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ColorPickButton from "../../../../custom-material-styles/ColorPickButton";

const colors = ["#00AB55", "#FDA92D", "#2065D1", "#FF3030", "#7635DC"];

interface ColorPickerProps {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, setSelectedColor }) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        gap: "10px",
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
          onClick={(e) => {
            setSelectedColor(color);
          }}
        >
          <Box
            component={motion.div}
            animate={{
              scale: selectedColor === color ? 1.5 : 1,
              transition: { type: "spring", stiffness: 300 },
            }}
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
