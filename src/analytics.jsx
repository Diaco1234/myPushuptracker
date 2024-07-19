{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import React, \{ useState \} from "react";\
import \{ createUseStyles \} from "react-jss";\
import "antd/dist/antd.css";\
import MyGraph from "./component/graph";\
import DropdownSelector from "./component/menu";\
import dataSet from "./component/data";\
\
const useStyles = createUseStyles(() => (\{\
  container: \{\
    color: "#fff",\
    padding: "1rem",\
    transition: "0.3s ease-in-out",\
    width: "1200px",\
    height: "400px",\
    display: "flex",\
    flexDirection: "column",\
    position: "relative"\
  \}\
\}));\
\
function Analytics() \{\
  const classes = useStyles();\
  const [data, setData] = useState(dataSet.Today);\
\
  const fetchCustomData = (key) => \{\
    setData(dataSet[key]);\
  \};\
\
  return (\
    <div className=\{classes.container\}>\
      <h1>Analytics</h1>\
      <DropdownSelector fetchCustomData=\{fetchCustomData\} />\
      <MyGraph data=\{data\} />\
    </div>\
  );\
\}\
\
export default Analytics;\
}