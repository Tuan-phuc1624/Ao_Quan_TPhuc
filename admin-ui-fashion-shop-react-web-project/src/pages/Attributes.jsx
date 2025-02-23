import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

//internal import
import AttributeTable from "@/components/attribute/AttributeTable";
import UploadManyTwo from "@/components/common/UploadManyTwo";
import AttributeDrawer from "@/components/drawer/AttributeDrawer";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import AttributeServices from "@/services/AttributeServices";

//internal import

const Attributes = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading, error } = useAsync(() =>
    AttributeServices.getAllAttributes({
      type: "attribute",
      option: "Dropdown",
      option1: "Radio",
    })
  );

  const { handleDeleteMany, allId, handleUpdateMany } = useToggleDrawer();

  const {
    filename,
    isDisabled,
    dataTable,
    serviceData,
    totalResults,
    attributeRef,
    resultsPerPage,
    handleSelectFile,
    handleChangePage,
    setAttributeTitle,
    handleSubmitAttribute,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.map((value) => value._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  // handle reset field function
  const handleResetField = () => {
    setAttributeTitle("");
    attributeRef.current.value = "";
  };

  return (
    <>
      <PageTitle>{"Thuộc Tính"}</PageTitle>
      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title="Selected Attributes"
      />
      <BulkActionDrawer ids={allId} title="Attributes" />
      <MainDrawer>
        <AttributeDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitAttribute}
            className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            <div className="flex justify-start xl:w-1/2  md:w-full">
         
            </div>

            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
               
              </div>
              <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleDeleteMany(isCheck)}
                  className="w-full rounded-md h-12 bg-red-500 btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>
                  {"Xóa"}
                </Button>
              </div>
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12 "
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
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitAttribute}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={attributeRef}
                type="search"
                placeholder={"Tìm kiếm"}
              />
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
        <TableLoading row={12} col={6} width={180} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
                <TableCell> {"Mã"} </TableCell>
                <TableCell> {"Tên thuộc tính"}</TableCell>
                <TableCell> {"Tên hiển thị"}</TableCell>
                <TableCell>{"Tùy chọn"}</TableCell>

                <TableCell className="text-center">
                  {"Đã công bố"}
                </TableCell>

                <TableCell className="text-center">{"Giá trị"}</TableCell>

                <TableCell className="text-right">{"Hành động"}</TableCell>
              </tr>
            </TableHeader>

            <AttributeTable
              lang={lang}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              attributes={dataTable}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no attributes right now." />
      )}
    </>
  );
};

export default Attributes;
