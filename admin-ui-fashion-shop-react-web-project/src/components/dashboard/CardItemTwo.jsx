import useUtilsFunction from "@/hooks/useUtilsFunction";
import { Card, CardBody } from "@windmill/react-ui";
import Skeleton from "react-loading-skeleton";

const CardItemTwo = ({
  mode,
  title,
  Icon,
  className,
  price,
  cash,
  card,
  credit,
  loading,
  title2,
}) => {
  const { currency, getNumberTwo } = useUtilsFunction();
  return (
    <>
      {loading ? (
        <Skeleton
          count={4}
          height={40}
          className="dark:bg-gray-800 bg-gray-200"
          baseColor={`${mode === "dark" ? "#010101" : "#f9f9f9"}`}
          highlightColor={`${mode === "dark" ? "#1a1c23" : "#f8f8f8"} `}
        />
      ) : (
        <>
          {title === "Today Order" || title === "Yesterday Order" ? (
            <Card className={`flex justify-center h-full`}>
              <CardBody
                className={`border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg ${className}`}
              >
                <div className="text-center xl:mb-0 mb-3">
                  <div
                    className={`text-center inline-block text-3xl ${className}`}
                  >
                    <Icon />
                  </div>
                  <div>
                    <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                      {title2 ? (
                        `${title2}`
                      ) : (
                        <Skeleton count={1} height={20} />
                      )}
                    </p>
                    <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">
                      {/* ${Math.round(price)} */}

                      {getNumberTwo(price)}
                    </p>
                  </div>
                  <div className="flex text-center text-xs font-normal text-gray-50 dark:text-gray-100">
                    <div className="px-1 mt-3">
                      {"Tiền mặt"} :{getNumberTwo(cash)}
                    </div>
                    <div className="px-1 mt-3">
                      {"Thẻ"} :{getNumberTwo(card)}
                    </div>
                    <div className="px-1 mt-3">
                      {"Tín dụng"} :{getNumberTwo(credit)}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
              <Card className="flex justify-center text-center h-full">
                <CardBody
                    className={`border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg ${className}`}
              >
                <div
                  className={`text-center inline-block text-3xl ${className}`}
                >
                  <Icon />
                </div>
                <div>
                  <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                    {`${title2}`}
                  </p>
                  <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">
                
                    {getNumberTwo(price)}
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default CardItemTwo;
