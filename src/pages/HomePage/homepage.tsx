import { ReactElement, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductsProps } from "./types";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { productsType } from "../../components/Navbar/types";

const exchangeRate = 6; // Example exchange rate

const convertToPeso = (dollars: number): number => {
  return dollars * exchangeRate;
};

const HomePage = (props: ProductsProps): ReactElement => {
  const { products } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<productsType | null>(
    null
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (product: productsType) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };
  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Thumbnail</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(row)} // Handle row click
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={row.thumbnail}
                      alt={row.title}
                      style={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">
                    P {convertToPeso(row.price ?? 1).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedProduct?.title}</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <div style={{ marginBottom: "10px" }}>
                <strong>Description:</strong> {selectedProduct.description}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Price:</strong> P
                {convertToPeso(selectedProduct.price ?? 1).toFixed(2)}
              </div>
              <div>
                <strong>More Images:</strong>
              </div>
              {selectedProduct?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={selectedProduct.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default HomePage;
