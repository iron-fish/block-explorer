import { FC } from "react";

const demoTrStyle = {
  height: 46,
  outline: '1px solid #DEDFE2',
  borderRadius: 4,
}

const demoThStyle = {
  fontSize: 12,
  color: 'gray'
}

const Table: FC = () => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0px 15px",
      }}
    >
      <tr style={demoThStyle}>
        <th>BLOCK HEIGHT</th>
        <th>SIZE</th>
        <th>TXN</th>
        <th>BLOCK HASH</th>
        <th>TIMESTAMP</th>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
      <tr style={demoTrStyle}>
        <td>23940194</td>
        <td>2.33kb</td>
        <td>1</td>
        <td>0000...5665...3463...4564</td>
        <td>6/22/2021 8:09:45PM</td>
      </tr>
    </table>
  );
};

export default Table;
