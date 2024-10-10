import { ReactElement } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Stack } from "@mui/material";
import "../../App.css";
import { productsType } from "./types";
import Homepage from "../../pages/HomePage/homepage";
export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 100, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100ch",
    },
  },
  justifyItems: "left",
}));

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#FFFFFF",
  top: "49px",
});

const Navbar = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<productsType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<productsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);
  return (
    <>
      <Stack spacing={10}>
        <Stack>
          <StyledAppBar className="Search-Appbar" position="absolute">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Product"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Search>
          </StyledAppBar>
        </Stack>
        {loading ? (
          <div>Searching...</div>
        ) : filteredProducts.length === 0 ? (
          <div>
            No products found based on the search keyword: "{searchTerm}"
          </div>
        ) : (
          <Homepage products={filteredProducts} />
        )}
      </Stack>
    </>
  );
};

export default Navbar;
