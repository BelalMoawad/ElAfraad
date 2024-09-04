import React from "react";
import "../styles/VerticalTable.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "./Button";

const VerticalTable = ({ data, columns }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  

  return (
    <>
      <Button text="طباعة" type="text" onClick={handlePrint} />
      <div ref={componentRef}>
        <p className="Top">
          بيانات {data[0].military_rank} / {data[0].name}
        </p>
        <div className="rotated-table">
          <div className="header-column">
            {data.map((row, rowIndex) => (
              <div key={rowIndex} className="data-row">
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="data-cell">
                    {column.value === "mobile_numbers" && row.mobile_numbers ? (
                      row.mobile_numbers.length > 0 ? (
                        <div>
                          {row.mobile_numbers
                            .map((mobileNumber) => mobileNumber.mobile_number)
                            .join(", ")}
                        </div>
                      ) : (
                        <div>-</div>
                      )
                    ) : typeof row[column.value] !== "object" ? (
                      row[column.value]
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="data-column">
            {columns.map((column, index) => (
              <div key={index} className="header-cell">
                {column.heading}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalTable;
