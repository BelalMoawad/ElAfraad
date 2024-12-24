import "../styles/Table.css";
import { Link } from "react-router-dom";

const Table = ({ data, column, type }) => {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data prop: ', data);
    return <p>No data available</p>;
  }

  if (!column || !Array.isArray(column)) {
    console.error('Invalid columns prop: ', column);
    return <p>No columns available</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => (
            (!(type === 'api_soldier' && item.heading === "رقم أقدمية") && <TableHeadItem item={item} />)
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow item={item} column={column} indx={index} type={type} />
        ))}
      </tbody>
    </table>
  );
};


const TableHeadItem = ({ item }) => <th style={{ width: item.width }}>{item.heading}</th>;
const TableRow = ({ item, column, indx, type }) => (
  <tr>
    {column.map((columnItem, index) => {
      if (columnItem.value === "militray_number") {
        return (
          <td style={{ width: columnItem.width }}>
              <Link className="elmnt" style={{ color: "#51a5d5" }} to={`/${type}/${item["id"]}`}>
                {item[`${columnItem.value}`]}
              </Link>
          </td>
        );
      }
      if(columnItem.value === "seniority_number") {
        return (type === "api_officer" && <td style={{ width: columnItem.width }}>{item[`${columnItem.value}`]}</td>);
      }
      if (columnItem.value === '') {
        return <td style={{ width: columnItem.width }}>{indx + 1}</td>;
      }
      if (columnItem.value === "mobile_numbers") {
        return (
          <td key={index} style={{ width: columnItem.width }}>
            <ul>
              {item[columnItem.value].map((mobileNumber, idx) => (
                <li className="smaLL" key={idx}>{mobileNumber.mobile_number}</li>
              ))}
            </ul>
          </td>
        );
      }
      if (columnItem.value === "entering_army_date" || columnItem.value === "exit_from_army_date") {
        return <td className="smaLL" style={{ width: columnItem.width }}>{item[`${columnItem.value}`]}</td>;
      }
      return <td style={{ width: columnItem.width }}>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default Table;
