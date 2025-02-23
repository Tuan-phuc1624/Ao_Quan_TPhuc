/** @format */

import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

//internal import

import UploadManyTwo from "@/components/common/UploadManyTwo";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import SelectCategory from "@/components/form/selectOption/SelectCategory";
import DeleteModal from "@/components/modal/DeleteModal";
import TableLoading from "@/components/preloader/TableLoading";
import ProductTable from "@/components/product/ProductTable";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useProductFilter from "@/hooks/useProductFilter";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import ProductServices from "@/services/ProductServices";

const Products = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const {
    toggleDrawer,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);

  const { data, loading, error } = useAsync(() =>
    ProductServices.getAllProducts({
      page: currentPage,
      limit: limitData,
      category: category,
      title: searchText,
      price: sortedField,
    })
  );
  console.log(data.products);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  // handle reset field
  const handleResetField = () => {
    setCategory("");
    setSortedField("");
    searchRef.current.value = "";
  };

  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useProductFilter(data);

  return (
    <>
      <PageTitle>{"Sản Phẩm"}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="Products" />
      <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex"
          >
            <div className="flex-grow-0 sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow">
             
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            
              </div>
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button
                  disabled={isCheck?.length < 1}
                  onClick={() => handleDeleteMany(isCheck, data.products)}
                  className="w-full rounded-md h-12 bg-red-300 disabled btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {"Xóa"}
                </Button>
              </div>
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {"Thêm"}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                type="search"
                name="search"
                placeholder="Tìm sản phẩm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>

            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <SelectCategory setCategory={setCategory} />
            </div>

            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select onChange={(e) => setSortedField(e.target.value)}>
                <option value="All" defaultValue hidden>
                  {"Giá"}
                </option>
                <option value="low">{"Giá thấp đến cao"}</option>
                <option value="high">{"Giá cao đến thấp"}</option>
                <option value="published">{"Đã xuất bản"}</option>
                <option value="unPublished">{"Chưa xuất bản"}</option>
                <option value="status-selling">{"Đang bán"}</option>
                <option value="status-out-of-stock">{"Hết hàng"}</option>
                <option value="date-added-asc">{"Ngày thêm vào (Tăng dần)"}</option>
                <option value="date-added-desc">{"Ngày thêm vào (Giảm dần)"}</option>
                <option value="date-updated-asc">{"Ngày cập nhật (Tăng dần)"}</option>
                <option value="date-updated-desc">{"Ngày cập nhật (Giảm dần)"}</option>
              </Select>
            </div>
            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <div className="w-full mx-1">
                <Button type="submit" className="h-12 w-full bg-emerald-700">
                  Lọc
                </Button>
              </div>

              <div className="w-full mx-1">
                <Button
                    layout="outline"
                    onClick={handleResetField}
                    type="reset"
                    className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                >
                <span className="text-black dark:text-gray-200">Hoàn Lại</span>
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    isChecked={isCheckAll}
                    handleClick={handleSelectAll}
                  />
                </TableCell>
                <TableCell>{"Tên"}</TableCell>
                <TableCell>{"Thể Loại"}</TableCell>
                <TableCell>{"Giá"}</TableCell>
                <TableCell>Mã vạch sản phẩm</TableCell>
                <TableCell>Hết hàng chưa nèh</TableCell>
                <TableCell className="text-right">{"Hành Động"}</TableCell>
              </tr>
            </TableHeader>
            <ProductTable
              isCheck={isCheck}
              products={data.products}
              setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Product Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Product" />
      )}
    </>
  );
};

export default Products;
