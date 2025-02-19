import React, { useEffect,useState } from "react";
import "./Filter.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "@mui/material/Slider";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../Features/Category/categorySlice"; // Import the fetchCategories action

const Filter = ({ onCategoryChange, onPriceRangeChange, onSearchChange }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useSelector((state) => state.categories.items);
  const categoryStatus = useSelector((state) => state.categories.status);
  const categoryError = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    onPriceRangeChange(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="filterSection">
      <div className="filterCategories">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <h5 className="filterHeading">Danh mục sản phẩm</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categoryStatus === 'loading' && <p>Loading...</p>}
            {categoryStatus === 'failed' && <p>{categoryError}</p>}
            {categoryStatus === 'succeeded' &&
              categories.map((category, index) => (
                <p
                  key={index}
                  className={selectedCategory === category.name ? "selected" : ""}
                  onClick={() => handleCategoryChange(category._id)}
                >
                  {category.name}
                </p>
              ))}
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="filterPrice">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <h5 className="filterHeading">GIÁ</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `đ${value}`}
              min={0}
              max={1000000}
              sx={{
                color: "black",
                "& .MuiSlider-thumb": {
                  backgroundColor: "white",
                  border: "2px solid black",
                  width: 18,
                  height: 18,
                },
              }}
            />
            <div className="filterSliderPrice">
              <div className="priceRange">
              <p>
                  Giá tối thiểu: <TextField
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const newValue = Math.min(Number(e.target.value), priceRange[1]);
                      handlePriceRangeChange(null, [newValue, priceRange[1]]);
                    }}
                    size="small" // Làm nhỏ ô text
                    inputProps={{
                      min: 0,
                      max: priceRange[1],
                    }}
                    sx={{
                      width: "80px", // Giảm chiều rộng
                      "& .MuiInputBase-input": {
                        padding: "5px", // Làm nhỏ nội dung bên trong
                      },
                    }}
                  />
                </p>
                <p>
                  Giá tối đa:  <TextField
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const newValue = Math.max(Number(e.target.value), priceRange[0]);
                      handlePriceRangeChange(null, [priceRange[0], newValue]);
                    }}
                    size="small" // Làm nhỏ ô text
                    inputProps={{
                      min: priceRange[0],
                      max: 1000000,
                    }}
                    sx={{
                      width: "80px", // Giảm chiều rộng
                      "& .MuiInputBase-input": {
                        padding: "5px", // Làm nhỏ nội dung bên trong
                      },
                    }}
                  />
                </p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Filter;