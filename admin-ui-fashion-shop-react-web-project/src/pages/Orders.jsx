import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import exportFromJSON from "export-from-json";
import { useContext, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import OrderTable from "@/components/order/OrderTable";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import OrderServices from "@/services/OrderServices";
import { notifyError } from "@/utils/toast";

const Orders = () => {
  const {
    time,
    setTime,
    status,
    endDate,
    setStatus,
    setEndDate,
    startDate,
    currentPage,
    searchText,
    searchRef,
    method,
    setMethod,
    setStartDate,
    setSearchText,
    handleChangePage,
    handleSubmitForAll,
    resultsPerPage,
  } = useContext(SidebarContext);

  const [loadingExport, setLoadingExport] = useState(false);

  const { data, loading, error } = useAsync(() =>
    OrderServices.getAllOrders({
      day: time,
      method: method,
      status: status,
      page: currentPage,
      endDate: endDate,
      startDate: startDate,
      limit: resultsPerPage,
      customerName: searchText,
    })
  );

  const { currency, getNumber, getNumberTwo } = useUtilsFunction();

  const { dataTable, serviceData } = useFilter(data?.orders);

  const handleDownloadOrders = async () => {
    try {
      setLoadingExport(true);
      const res = await OrderServices.getAllOrders({
        page: 1,
        day: time,
        method: method,
        status: status,
        endDate: endDate,
        download: true,
        startDate: startDate,
        limit: data?.totalDoc,
        customerName: searchText,
      });

      // console.log("handleDownloadOrders", res);
      const exportData = res?.orders?.map((order) => {
        return {
          _id: order._id,
          invoice: order.invoice,
          subTotal: getNumberTwo(order.subTotal),
          shippingCost: getNumberTwo(order.shippingCost),
          discount: getNumberTwo(order?.discount),
          total: getNumberTwo(order.total),
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          status: order.status,
          user_info: order?.user_info?.name,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
      });
      // console.log("exportData", exportData);

      exportFromJSON({
        data: exportData,
        fileName: "orders",
        exportType: exportFromJSON.types.csv,
      });
      setLoadingExport(false);
    } catch (err) {
      setLoadingExport(false);
      // console.log("err on orders download", err);
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  // handle reset field
  const handleResetField = () => {
    setTime("");
    setMethod("");
    setStatus("");
    setEndDate("");
    setStartDate("");
    setSearchText("");
    searchRef.current.value = "";
  };
  // console.log("data in orders page", data);

  return (
    <>
      <PageTitle>{"Đơn Hàng"}</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form onSubmit={handleSubmitForAll}>
            <div className="grid gap-4 lg:gap-4 xl:gap-6 md:gap-2 md:grid-cols-5 py-2">
              <div>
                <Input
                  ref={searchRef}
                  type="search"
                  name="search"
                  placeholder="Tìm kiếm theo tên khách hàng"
                  value={searchText} 
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div>
                <Select onChange={(e) => setStatus(e.target.value)}>
                  <option value="Status" defaultValue hidden>
                    {"Trạng Thái"}
                  </option>
                  <option value="Delivered">{"PageOrderDelivered"}</option>
                  <option value="Pending">{"PageOrderPending"}</option>
                  <option value="Processing">{"PageOrderProcessing"}</option>
                  <option value="Cancel">{"OrderCancel"}</option>
                </Select>
              </div>

              <div>
                <Select onChange={(e) => setTime(e.target.value)}>
                  <option value="Order limits" defaultValue hidden>
                    {"Giới hạn đơn hàng"}
                  </option>
                  <option value="5">{"DaysOrders5"}</option>
                  <option value="7">{"DaysOrders7"}</option>
                  <option value="15">{"DaysOrders15"}</option>
                  <option value="30">{"DaysOrders30"}</option>
                </Select>
              </div>
              <div>
                <Select onChange={(e) => setMethod(e.target.value)}>
                  <option value="Method" defaultValue hidden>
                    {"Phương Thức"}
                  </option>

                  <option value="Cash">{"Cash"}</option>
                  <option value="Card">{"Card"}</option>
                  <option value="Credit">{"Credit"}</option>
                </Select>
              </div>
              <div>
                {loadingExport ? (
                  <Button disabled={true} type="button" className="h-12 w-full">
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">
                      Processing
                    </span>
                  </Button>
                ) : (
                  <button
                    onClick={handleDownloadOrders}
                    disabled={data?.orders?.length <= 0 || loadingExport}
                    type="button"
                    className={`${
                      (data?.orders?.length <= 0 || loadingExport) &&
                      "opacity-50 cursor-not-allowed bg-emerald-600"
                    } flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium px-6 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 `}
                  >
                    Tải xuống tất cả các đơn hàng
                    <span className="ml-2 text-base">
                      <IoCloudDownloadOutline />
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
              <div>
                <Label>Ngày bắt đầu</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <Label>Ngày kết thúc</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mt-2 md:mt-0 flex items-center xl:gap-x-4 gap-x-1 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Label style={{ visibility: "hidden" }}>Filter</Label>
                  <Button type="submit" className="h-12 w-full bg-emerald-700">
                    Lọc
                  </Button>
                </div>

                <div className="w-full">
                  <Label style={{ visibility: "hidden" }}>Hoàn Lại</Label>
                  <Button
                    layout="outline"
                    onClick={handleResetField}
                    type="reset"
                    className="px-4 md:py-1 py-3 text-sm dark:bg-gray-700"
                  >
                    <span className="text-black dark:text-gray-200">Reset</span>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
      {data?.methodTotals?.length > 0 && (
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
          <CardBody>
            <div className="flex gap-1">
              {data?.methodTotals?.map((el, i) => (
                <div key={i + 1} className="dark:text-gray-300">
                  {el?.method && (
                    <>
                      <span className="font-medium"> {el.method}</span> :{" "}
                      <span className="font-semibold mr-2">
                        {currency}
                        {getNumber(el.total)}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"Số hóa đơn"}</TableCell>
                <TableCell>{"Thời gian"}</TableCell>
                <TableCell>{"Tên khách hàng"}</TableCell>
                <TableCell>{"Thanh Toán"}</TableCell>
                <TableCell>{"Số tiền"}</TableCell>
                <TableCell>{"Trạng thái đơn hàng"}</TableCell>
                <TableCell>{"Hành động"}</TableCell>
                <TableCell className="text-right">{"Hóa đơn"}</TableCell>
              </tr>
            </TableHeader>

            <OrderTable orders={dataTable} />
          </Table>

          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no orders right now." />
      )}
    </>
  );
};

export default Orders;
