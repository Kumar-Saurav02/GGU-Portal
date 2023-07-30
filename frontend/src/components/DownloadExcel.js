import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  getIncidents,
  deleteIncident,
  updateIncident,
  getIncident,
} from "./api";
import * as html2canvas from "html2canvas";
import JSZip from "jszip";
import ExcelJS from "exceljs";

const DataTableComponent = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState({});

  useEffect(() => {
    setSelectedRows((prevSelectedRows) => {
      return prevSelectedRows.map((row) => {
        const updatedRow = incidents.find(
          (incident) => incident._id === row._id
        );
        return updatedRow ? updatedRow : row;
      });
    });
  }, [incidents]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (searchValue) {
      const searchResults = incidents.filter((incident) =>
        incident.incidentNumber
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredData(searchResults);
    } else {
      setFilteredData(incidents);
    }
  };

  useEffect(() => {
    setFilteredData(incidents);
  }, [incidents]);

  const DeleteButton = () => {
    const handleDelete = async () => {
      // Display confirmation dialog
      const isConfirmed = window.confirm("Are you sure you want to delete?");

      // If the user confirms the deletion
      if (isConfirmed) {
        await Promise.all(selectedRows.map((row) => deleteIncident(row._id)));
        fetchData();
        window.location.reload();
      }
    };

    const isDisabled = selectedRows.length === 0;

    return (
      <button
        className={`datatable-buttons${
          isDisabled ? " datatable-buttons-disabled" : ""
        }`}
        disabled={isDisabled}
        onClick={handleDelete}>
        Delete Selected
      </button>
    );
  };

  const exportToExcel = async (rowsToExport, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Set the same width for all columns
    const columnWidth = 30;
    worksheet.columns = columns.map((column) => {
      return { width: columnWidth };
    });

    // Set the same height for all rows
    const rowHeight = 30;

    // Write header
    columns.forEach((column, colIndex) => {
      const cell = worksheet.getCell(1, colIndex + 1);
      cell.value = column.name;
      cell.font = { name: "Calibri", size: 11, bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD3D3D3" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    worksheet.getRow(1).height = rowHeight;

    const fiberNodeColumnIndex = columns.findIndex(
      (column) => column.name === "Fiber Nodes (Type)"
    );

    // Write data
    rowsToExport.forEach((row, rowIndex) => {
      const newRow = worksheet.addRow();
      newRow.height = rowHeight;
      columns.forEach((column, colIndex) => {
        const cell = newRow.getCell(colIndex + 1);
        let value = column.selector(row);
        if (column.name === "Start Date" || column.name === "End Date") {
          if (value) {
            const date = new Date(value);
            cell.value = date;
            cell.numFmt = "dd-mm-yyyy"; // Format the date in dd-mm-yyyy format
          } else {
            cell.value = ""; // Set the cell value to an empty string if the date is not valid
          }
        } else if (column.name === "Fiber Nodes (Type)") {
          value = value.replace(/,/g, "\n"); // Replace commas with newline characters
          cell.value = value;
          cell.alignment = { wrapText: true }; // Enable text wrapping
        } else {
          cell.value = value;
        }
        cell.font = { name: "Calibri", size: 11 };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        if (colIndex === 0 || colIndex === 1) {
          cell.font.bold = true;
        }
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        if (colIndex === fiberNodeColumnIndex) {
          cell.alignment.wrapText = true;
        }
      });
    });

    // Save file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ExportAllButton = () => {
    const handleExportAll = () => {
      exportToExcel(incidents, "all_incidents.xlsx");
    };

    return (
      <button className="datatable-buttons" onClick={handleExportAll}>
        Export All Sheet
      </button>
    );
  };

  const ExportSelectedButton = () => {
    const handleExportSelected = () => {
      exportToExcel(selectedRows, "selected_incidents.xlsx");
    };

    const isDisabled = selectedRows.length === 0;

    return (
      <button
        className={`datatable-buttons${
          isDisabled ? " datatable-buttons-disabled" : ""
        }`}
        disabled={isDisabled}
        onClick={handleExportSelected}>
        Export Sheet
      </button>
    );
  };

  const getRowHtml = (row) => {
    const fiberNodes = row.fiberNodes.split(",").map((node) => {
      const match = node.trim().match(/^(.+)\s\((.+)\)$/);
      const name = match ? match[1] : "";
      const type = match ? match[2] : "";
      return { name, type };
    });

    const categorizedNodes = fiberNodes.reduce((acc, node) => {
      if (!acc[node.type]) {
        acc[node.type] = [];
      }
      acc[node.type].push(node.name); // Escape (
      return acc;
    }, {});

    const formattedFiberNodes = Object.entries(categorizedNodes)
      .map(
        ([type, nodes]) =>
          `<strong style="text-decoration: underline;">${type}</strong><br>${nodes.join(
            "<br>"
          )}`
      )
      .join("<br><br>");

    return `
      <div style="font-family: Arial, sans-serif; font-size: 12px; padding: 10px; line-height: 1.5; width: 100%;">
        <div style="height: 3px; background-color: rgba(241, 16, 0, 0.79); border-radius: 5px;"></div>
        <div style="font-size: 9.5px; font-weight: bold; margin-top: 5px; margin-bottom: 5px; font-family: 'Calibri';">Please be informed that we are currently experiencing a technical problem as described below:</div>
          <table style="border-collapse: collapse; width: 100%; border: 1px solid black;">
            <tr>
              <td style="border-bottom: 1px solid black; font-family: 'Calibri'"><strong>Start Time:</strong></td>
              <td style="text-align: center; border-left: 1px solid black; border-bottom: 1px solid black; font-family: 'Calibri';">${
                row.startDate
                  ? new Date(row.startDate)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                  : ""
              }</td>
              <td style="text-align: center; border-left: 1px solid black; border-bottom: 1px solid black; font-family: 'Calibri';">${
                row.startTime
              } Jordan Time </td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid black; font-family: 'Calibri'"><strong>Region:</strong></td>
              <td colspan="2" style="text-align: center; border-left: 1px solid black; border-bottom: 1px solid black; font-family: 'Calibri'">Fiber cut in ${
                row.area
              }</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid black; font-family: 'Calibri'"><strong>Affected Links:</strong></td>
              <td colspan="2" style="border-left: 1px solid black; border-bottom: 1px solid black; font-family: 'Calibri'">${formattedFiberNodes}</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid black; font-family: 'Calibri'"><strong>Impact:</strong></td>
              <td colspan="2" style="text-align: center; border-left: 1px solid black; border-bottom: 1px solid black; font-family: 'Calibri'">${
                row.serviceImpact
              }</td>
            </tr>
            <tr>
              <td style="border-bottom: none; font-family: 'Calibri'"><strong>Informed:</strong></td>
              <td style="text-align: center; border-left: 1px solid black; border-bottom: none; font-family: 'Calibri'">${
                row.informedBy
              }</td>
              <td style="text-align: center; border-left: 1px solid black; border-bottom: none; font-family: 'Calibri'">${
                row.informedTime
              } Jordan Time </td>
            </tr>
          </table>
          <div style="font-size: 9.5px; font-weight: bold; margin-top: 5px; margin-bottom: 5px; font-family: 'Calibri';">We will keep you updated.</div>
          <div style="height: 3px; background-color: rgba(241, 16, 0, 0.79); border-radius: 5px;"></div>
      </div>`;
  };

  const createOffScreenContainer = (html) => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-10000px";
    container.style.top = "-10000px";
    container.innerHTML = html;
    document.body.appendChild(container);
    return container;
  };

  const captureRowAsImage = (row) =>
    new Promise(async (resolve) => {
      const rowHtml = getRowHtml(row);
      const container = createOffScreenContainer(rowHtml);
      const options = {
        backgroundColor: "white",
        width: container.scrollWidth,
        height: container.scrollHeight,
        scale: 2,
      };

      // Open a new window/tab
      const newWindow = window.open("", "_blank");
      newWindow.document.write(
        "<!DOCTYPE html><html><head><style>body {margin: 0;}</style></head><body>"
      );
      newWindow.document.body.appendChild(container);

      setTimeout(async () => {
        const canvas = await html2canvas(container, options);
        newWindow.document.body.removeChild(container);
        newWindow.close(); // Close the new tab
        resolve(canvas.toDataURL("image/png"));
      }, 100);
    });

  const downloadZip = (zip, filename) => {
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const ExportImage = () => {
    const handleExport = async () => {
      if (selectedRows.length === 1) {
        const row = selectedRows[0];
        const imgData = await captureRowAsImage(row);
        const url = imgData;
        const link = document.createElement("a");
        link.href = url;
        link.download = `row-${row._id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const zip = new JSZip();
        for (const row of selectedRows) {
          const imgData = await captureRowAsImage(row);
          zip.file(`row-${row._id}.png`, imgData.split("base64,")[1], {
            base64: true,
          });
        }
        downloadZip(zip, "selected-rows.zip");
      }
    };

    const isDisabled = selectedRows.length === 0;
    return (
      <button
        className={`datatable-buttons${
          isDisabled ? " datatable-buttons-disabled" : ""
        }`}
        onClick={handleExport}
        disabled={isDisabled}>
        Export Image
      </button>
    );
  };

  const ExportAllRowsImage = () => {
    const handleExport = async () => {
      const zip = new JSZip();
      for (const row of incidents) {
        const imgData = await captureRowAsImage(row);
        zip.file(`row-${row._id}.png`, imgData.split("base64,")[1], {
          base64: true,
        });
      }
      downloadZip(zip, "all-rows.zip");
    };

    return (
      <button className="datatable-buttons" onClick={handleExport}>
        Export All Image
      </button>
    );
  };

  const EditButton = ({ onEdit }) => {
    const handleEdit = () => {
      if (selectedRows.length === 1) {
        onEdit();
      }
    };

    const isDisabled = selectedRows.length !== 1;

    return (
      <button
        className={`datatable-buttons${
          isDisabled ? " datatable-buttons-disabled" : ""
        }`}
        onClick={handleEdit}
        disabled={isDisabled}>
        Edit Selected
      </button>
    );
  };

  const handleSubmitEdit = async (updatedData) => {
    await updateIncident(rowToEdit._id, updatedData);
    setEditModalVisible(false);
    fetchData(); // Refresh the data after editing

    setSelectedRowIds((prevSelectedRowIds) => {
      return { ...prevSelectedRowIds, [rowToEdit._id]: true };
    });
  };

  const handleEdit = async () => {
    const selectedRow = selectedRows[0];
    const data = await getIncident(selectedRow._id);
    setRowToEdit({ ...selectedRow, ...data });
    setEditModalVisible(true);
  };

  const EditModal = ({ visible, onSubmit, onClose, initialData }) => {
    const [formData, setFormData] = useState(initialData);
    const [durationHours, setDurationHours] = useState("");

    useEffect(() => {
      if (formData) {
        const { startDate, startTime, endDate, endTime } = formData;

        if (startDate && startTime && endDate && endTime) {
          const startDateTime = new Date(`${startDate}T${startTime}`);
          const endDateTime = new Date(`${endDate}T${endTime}`);
          const diffInMs = Math.abs(endDateTime - startDateTime);
          const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
          const diffInMinutes = Math.floor(
            (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
          );
          setDurationHours(
            `${diffInHours.toString().padStart(2, "0")}:${diffInMinutes
              .toString()
              .padStart(2, "0")}`
          );
        }
      }
    }, [formData]);

    useEffect(() => {
      setFormData(initialData);
    }, [initialData]);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      // Display confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to submit the changes?"
      );

      // If the user confirms the edit
      if (isConfirmed) {
        onSubmit({ ...formData, durationHours });
      }
    };

    if (!visible) {
      return null;
    }

    // Helper function to handle changes for nested objects (informedBy, area, etc.)
    const handleNestedChange = (key, event) => {
      setFormData({
        ...formData,
        [key]: { ...formData[key], [event.target.name]: event.target.value },
      });
    };

    const handleArrayChange = (key, index, event) => {
      const newArray = [...formData[key]];
      newArray[index][event.target.name] = event.target.value;
      setFormData({ ...formData, [key]: newArray });
    };

    // Helper function to add new fiber node
    const handleAddNode = () => {
      setFormData({
        ...formData,
        fiberNodes: [
          ...formData.fiberNodes,
          { node: "", type: "", otherValue: "" },
        ],
      });
    };

    const handleDeleteNode = (index) => {
      setFormData({
        ...formData,
        fiberNodes: formData.fiberNodes.filter((_, i) => i !== index),
      });
    };

    return (
      <div className="edit-modal">
        <div className="edit-modal-content form-main">
          <h2>Edit Incident</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-data">
              <div className=" input">
                <label htmlFor="incidentNumber " className="input-label-table">
                  Incident #:
                </label>
                <input
                  type="text"
                  name="incidentNumber"
                  value={formData.incidentNumber}
                  onChange={handleInputChange}
                  className="input-box"
                />
              </div>
              <div className="input">
                <label
                  htmlFor="notificationNumber"
                  className="input-label-table">
                  Notification #:
                </label>
                <input
                  type="text"
                  name="notificationNumber"
                  value={formData.notificationNumber}
                  onChange={handleInputChange}
                  className="input-box"
                />
              </div>
              <div className="input">
                <label htmlFor="startDate" className="input-label-table">
                  Start Date:
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="input-box"
                />

                <label htmlFor="startTime" className="input-label-table">
                  Start Time:
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="input-box"
                />
              </div>
              <div className="input">
                <label htmlFor="endDate" className="input-label-table">
                  End Date:
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="input-box"
                />
                <label htmlFor="endTime" className="input-label-table">
                  End Time:
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="input-box"
                />
              </div>
              <div className="input">
                <label htmlFor="durationHours" className="input-label-table">
                  Duration (hours):
                </label>
                <input
                  type="text"
                  name="durationHours"
                  value={durationHours}
                  readOnly
                  className="input-box"
                />
              </div>
              <div className="input">
                <label htmlFor="informedBy" className="input-label-table">
                  Informed By:
                </label>
                <select
                  name="value"
                  value={formData.informedBy.value || ""}
                  onChange={(event) => handleNestedChange("informedBy", event)}
                  className="input-box">
                  <option value="">Select an option</option>
                  <option value="Value1">Value1</option>
                  <option value="Value2">Value1</option>
                  <option value="Value3">Value3</option>
                  <option value="Others">Others</option>
                </select>
                {formData.informedBy.value === "Others" && (
                  <input
                    type="text"
                    name="otherValue"
                    value={formData.informedBy.otherValue || ""}
                    onChange={(event) =>
                      handleNestedChange("informedBy", event)
                    }
                    className="input-box"
                  />
                )}
                <label htmlFor="informedTime" className="input-label-table">
                  Informed Time:
                </label>
                <input
                  type="time"
                  name="informedTime"
                  value={formData.informedTime || ""}
                  onChange={handleInputChange}
                  className="input-box"
                  style={{ width: "80px" }}
                />
              </div>
              <div className="input">
                <label htmlFor="fiberNodes" className="input-label-table">
                  Fiber Nodes:
                </label>
                {formData.fiberNodes.map((node, index) => (
                  <div key={index}>
                    <label htmlFor="node" className="input-label-node">
                      Node:
                    </label>
                    <input
                      type="text"
                      name="node"
                      value={node.node}
                      onChange={(event) =>
                        handleArrayChange("fiberNodes", index, event)
                      }
                      className="input-box"
                    />
                    <label htmlFor="type" className="input-label-node">
                      Type:
                    </label>
                    <select
                      name="type"
                      value={node.type}
                      onChange={(event) =>
                        handleArrayChange("fiberNodes", index, event)
                      }
                      className="input-box">
                      <option value="">Select Type</option>
                      <option value="IPRAN">IPRAN</option>
                      <option value="OSN">OSN</option>
                      <option value="WDM">WDM</option>
                      <option value="RTN">RTN</option>
                      <option value="MPLS">MPLS</option>
                      <option value="Others">Others</option>
                    </select>
                    {node.type === "Others" && (
                      <input
                        type="text"
                        name="otherValue"
                        value={node.otherValue}
                        onChange={(event) =>
                          handleArrayChange("fiberNodes", index, event)
                        }
                        className="input-box"
                      />
                    )}
                    <button
                      type="button"
                      className="input-button delete-node-button"
                      onClick={() => handleDeleteNode(index)}>
                      Delete Node
                    </button>
                  </div>
                ))}
              </div>
              <div className="add-node-button">
                <button
                  type="button"
                  className="input-button"
                  onClick={handleAddNode}>
                  Add Node
                </button>
              </div>

              <div className="input">
                <label htmlFor="area" className="input-label-table">
                  Area:
                </label>
                <select
                  className="input-box"
                  name="value"
                  value={formData.area.value || ""}
                  onChange={(event) => handleNestedChange("area", event)}>
                  <option value="">Select an option</option>
                  <option value="Amm Area">Amm Area</option>
                  <option value="East Area">East Area</option>
                  <option value="West Area">West Area</option>
                  <option value="North Area">North Area</option>
                  <option value="South Area">South Area</option>
                  <option value="Others">Others</option>
                </select>
                {formData.area.value === "Others" && (
                  <input
                    type="text"
                    name="otherValue"
                    value={formData.area.otherValue || ""}
                    onChange={(event) => handleNestedChange("area", event)}
                    className="input-box"
                  />
                )}
              </div>
              <div className="input">
                <label htmlFor="owner" className="input-label-table">
                  Owner:
                </label>
                <select
                  className="input-box"
                  name="value"
                  value={formData.owner.value || ""}
                  onChange={(event) => handleNestedChange("owner", event)}>
                  <option value="">Select an option</option>
                  <option value="Value1">Value1</option>
                  <option value="Mada">Mada</option>
                  <option value="Umniah">Umniah</option>
                  <option value="Orange">Orange</option>
                  <option value="RJAF">RJAF</option>
                  <option value="Others">Others</option>
                </select>
                {formData.owner.value === "Others" && (
                  <input
                    className="input-box"
                    type="text"
                    name="otherValue"
                    value={formData.owner.otherValue || ""}
                    onChange={(event) => handleNestedChange("owner", event)}
                  />
                )}
              </div>
              <div className="input">
                <label htmlFor="longitude" className="input-label-table">
                  Longitude:
                </label>
                <input
                  className="input-box"
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                />
                <br />
                <label htmlFor="latitude" className="input-label-table">
                  Latitude:
                </label>
                <input
                  className="input-box"
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input">
                <label htmlFor="rca" className="input-label-table">
                  RCA:
                </label>
                <select
                  className="input-box"
                  name="value"
                  value={formData.rca.value || ""}
                  onChange={(event) => handleNestedChange("rca", event)}>
                  <option value="">Select an option</option>
                  <option value="Value1">Value1</option>
                  <option value="Value2">Value2</option>
                  <option value="Value3">Value1</option>
                  <option value="Vandalism">Vandalism</option>
                  <option value="Others">Others</option>
                </select>
                {formData.rca.value === "Others" && (
                  <input
                    className="input-box"
                    type="text"
                    name="otherValue"
                    value={formData.rca.otherValue || ""}
                    onChange={(event) => handleNestedChange("rca", event)}
                  />
                )}
              </div>
              <div className="input">
                <label htmlFor="serviceImpact" className="input-label-table">
                  Service Impact:
                </label>
                <select
                  className="input-box"
                  name="value"
                  value={formData.serviceImpact.value || ""}
                  onChange={(event) =>
                    handleNestedChange("serviceImpact", event)
                  }>
                  <option value="">Select an option</option>
                  <option value="Value1">Value1</option>
                  <option value="No Service Effective">
                    No Service Effective
                  </option>
                  <option value="Others">Others</option>
                </select>
                {formData.serviceImpact.value === "Others" && (
                  <input
                    className="input-box"
                    type="text"
                    name="otherValue"
                    value={formData.serviceImpact.otherValue || ""}
                    onChange={(event) =>
                      handleNestedChange("serviceImpact", event)
                    }
                  />
                )}
              </div>
              <div className="input">
                <label htmlFor="informedTeams" className="input-label-table">
                  Informed Teams:
                </label>
                <select
                  className="input-box"
                  name="value"
                  value={formData.informedTeams.value || ""}
                  onChange={(event) =>
                    handleNestedChange("informedTeams", event)
                  }>
                  <option value="">Select an option</option>
                  <option value="Related team was informed ">
                    Related team was informed{" "}
                  </option>
                  <option value="Y">Y</option>
                  <option value="Z">Z</option>
                  <option value="Others">Others</option>
                </select>
                {formData.informedTeams.value === "Others" && (
                  <input
                    className="input-box"
                    type="text"
                    name="otherValue"
                    value={formData.informedTeams.otherValue || ""}
                    onChange={(event) =>
                      handleNestedChange("informedTeams", event)
                    }
                  />
                )}
              </div>
              <div className="input">
                <label htmlFor="loggedBy" className="input-label-table">
                  Logged By:
                </label>
                <select
                  className="input-box"
                  name="value"
                  value={formData.loggedBy.value || ""}
                  onChange={(event) => handleNestedChange("loggedBy", event)}>
                  <option value="">Select an option</option>
                  <option value="Value1">Value1</option>
                  <option value="Value2">Value2</option>
                  <option value="Z">Z</option>
                  <option value="Others">Others</option>
                </select>
                {formData.loggedBy.value === "Others" && (
                  <input
                    type="text"
                    name="otherValue"
                    value={formData.loggedBy.otherValue || ""}
                    onChange={(event) => handleNestedChange("loggedBy", event)}
                  />
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="input-button submit-btn"
                  style={{ margin: "1.5rem" }}>
                  Submit
                </button>
                <button
                  type="button"
                  className="input-button submit-btn"
                  onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const fetchData = async () => {
    const data = await getIncidents();
    const modifiedData = data.map((incident) => {
      const informedByValue = incident.informedBy.value;
      const informedByOtherValue = incident.informedBy.otherValue || "";
      const informedBy =
        informedByValue === "Others" && informedByOtherValue !== ""
          ? `${informedByOtherValue}`
          : informedByValue;
      const rcaValue = incident.rca.value;
      const rcaOtherValue = incident.rca.otherValue || "";
      const rca =
        rcaValue === "Others" && rcaOtherValue !== ""
          ? `${rcaOtherValue}`
          : rcaValue;
      const areaValue = incident.area.value;
      const areaOtherValue = incident.area.otherValue || "";
      const area =
        areaValue === "Others" && areaOtherValue !== ""
          ? `${areaOtherValue}`
          : areaValue;

      const ownerValue = incident.owner.value;
      const ownerOtherValue = incident.owner.otherValue || "";
      const owner =
        ownerValue === "Others" && ownerOtherValue !== ""
          ? `${ownerOtherValue}`
          : ownerValue;

      const serviceImpactValue = incident.serviceImpact.value;
      const serviceImpactOtherValue = incident.serviceImpact.otherValue || "";
      const serviceImpact =
        serviceImpactValue === "Others" && serviceImpactOtherValue !== ""
          ? `${serviceImpactOtherValue}`
          : serviceImpactValue;

      const informedTeamsValue = incident.informedTeams.value;
      const informedTeamsOtherValue = incident.informedTeams.otherValue || "";
      const informedTeams =
        informedTeamsValue === "Others" && informedTeamsOtherValue !== ""
          ? `${informedTeamsOtherValue}`
          : informedTeamsValue;

      const loggedByValue = incident.loggedBy.value;
      const loggedByOtherValue = incident.loggedBy.otherValue || "";
      const loggedBy =
        loggedByValue === "Others" && loggedByOtherValue !== ""
          ? `${loggedByOtherValue}`
          : loggedByValue;

      const fiberNodes =
        incident.fiberNodes && Array.isArray(incident.fiberNodes)
          ? incident.fiberNodes
              .map((node) => {
                const typeValue = node.type;
                const otherValue = node.otherValue;
                const formattedType =
                  typeValue === "Others" && otherValue !== ""
                    ? `${otherValue}`
                    : typeValue;
                return `${node.node} (${formattedType})`;
              })
              .join(", ")
          : "";
      return {
        ...incident,
        informedBy,
        fiberNodes,
        rca,
        area,
        owner,
        serviceImpact,
        informedTeams,
        loggedBy,
      };
    });
    setIncidents(modifiedData);
  };

  const columns = [
    {
      name: "Incident Number",
      selector: (row) => row.incidentNumber,
      sortable: true,
      cell: (row) => (
        <div className="incidentNumber-cell" id={`row-${row._id}`}>
          {row.incidentNumber}
        </div>
      ),
      header: (column) => (
        <div className="incidentNumber-header">{column.name}</div>
      ),
    },
    {
      name: "Notification Number",
      selector: (row) => row.notificationNumber,
      sortable: true,
      cell: (row) => (
        <div className="notificationNumber-cell" id={`row-${row._id}`}>
          {row.notificationNumber}
        </div>
      ),
      header: (column) => (
        <div className="notificationNumber-header">{column.name}</div>
      ),
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
      cell: (row) => (
        <div className="startDate-cell" id={`row-${row._id}`}>
          {row.startDate
            ? new Date(row.startDate)
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-")
            : ""}
        </div>
      ),
      header: (column) => <div className="startDate-header">{column.name}</div>,
    },
    {
      name: "Start Time",
      selector: (row) => row.startTime,
      sortable: true,
      cell: (row) => (
        <div className="startTime-cell" id={`row-${row._id}`}>
          {row.startTime}
        </div>
      ),
      header: (column) => <div className="startTime-header">{column.name}</div>,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      sortable: true,
      cell: (row) => (
        <div className="endDate-cell" id={`row-${row._id}`}>
          {row.endDate
            ? new Date(row.endDate)
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-")
            : ""}
        </div>
      ),
      header: (column) => <div className="endDate-header">{column.name}</div>,
    },
    {
      name: "End Time",
      selector: (row) => row.endTime,
      sortable: true,
      cell: (row) => (
        <div className="endTime-cell" id={`row-${row._id}`}>
          {row.endTime}
        </div>
      ),
      header: (column) => <div className="endTime-header">{column.name}</div>,
    },
    {
      name: "Duration Hours",
      selector: (row) => row.durationHours,
      sortable: true,
      cell: (row) => (
        <div className="durationHours-cell" id={`row-${row._id}`}>
          {row.durationHours}
        </div>
      ),
      header: (column) => (
        <div className="durationHours-header">{column.name}</div>
      ),
    },
    {
      name: "Informed By",
      selector: (row) => row.informedBy,
      sortable: true,
      cell: (row) => (
        <div className="informedBy-cell" id={`row-${row._id}`}>
          {row.informedBy}
        </div>
      ),
      header: (column) => (
        <div className="informedBy-header">{column.name}</div>
      ),
    },
    {
      name: "Informed Time",
      selector: (row) => row.informedTime,
      sortable: true,
      cell: (row) => (
        <div className="informedTime-cell" id={`row-${row._id}`}>
          {row.informedTime}
        </div>
      ),
      header: (column) => (
        <div className="informedTime-header">{column.name}</div>
      ),
    },
    {
      name: "Fiber Nodes (Type)",
      selector: (row) => row.fiberNodes,
      sortable: true,
      cell: (row) => (
        <div className="fiberNodes-cell" id={`row-${row._id}`}>
          {row.fiberNodes.split(",").map((node) => (
            <React.Fragment key={node}>
              {node.trim()}
              <br />
            </React.Fragment>
          ))}
        </div>
      ),
      header: (column) => (
        <div className="fiberNodes-header">{column.name}</div>
      ),
    },
    {
      name: "Area",
      selector: (row) => row.area,
      sortable: true,
      cell: (row) => (
        <div className="area-cell" id={`row-${row._id}`}>
          {row.area}
        </div>
      ),
      header: (column) => <div className="area-header">{column.name}</div>,
    },
    {
      name: "Owner",
      selector: (row) => row.owner,
      sortable: true,
      cell: (row) => (
        <div className="owner-cell" id={`row-${row._id}`}>
          {row.owner}
        </div>
      ),
      header: (column) => <div className="owner-header">{column.name}</div>,
    },
    {
      name: "Longitude",
      selector: (row) => row.longitude,
      sortable: true,
      cell: (row) => (
        <div className="longitude-cell" id={`row-${row._id}`}>
          {row.longitude}
        </div>
      ),
      header: (column) => <div className="longitude-header">{column.name}</div>,
    },
    {
      name: "Latitude",
      selector: (row) => row.latitude,
      sortable: true,
      cell: (row) => (
        <div className="latitude-cell" id={`row-${row._id}`}>
          {row.latitude}
        </div>
      ),
      header: (column) => <div className="latitude-header">{column.name}</div>,
    },
    {
      name: "RCA",
      selector: (row) => row.rca,
      sortable: true,
      cell: (row) => (
        <div className="rca-cell" id={`row-${row._id}`}>
          {row.rca}
        </div>
      ),
      header: (column) => <div className="rca-header">{column.name}</div>,
    },
    {
      name: "Service Impact",
      selector: (row) => row.serviceImpact,
      sortable: true,
      cell: (row) => (
        <div className="serviceImpact-cell" id={`row-${row._id}`}>
          {row.serviceImpact}
        </div>
      ),
      header: (column) => (
        <div className="serviceImpact-header">{column.name}</div>
      ),
    },
    {
      name: "Informed Teams",
      selector: (row) => row.informedTeams,
      sortable: true,
      cell: (row) => (
        <div className="informedTeams-cell" id={`row-${row._id}`}>
          {row.informedTeams}
        </div>
      ),
      header: (column) => (
        <div className="informedTeams-header">{column.name}</div>
      ),
    },
    {
      name: "Logged By",
      selector: (row) => row.loggedBy,
      sortable: true,
      cell: (row) => (
        <div className="loggedBy-cell" id={`row-${row._id}`}>
          {row.loggedBy}
        </div>
      ),
      header: (column) => <div className="loggedBy-header">{column.name}</div>,
    },
  ];

  return (
    <div>
      <div className="table-controls">
        <div className="buttons-container">
          <DeleteButton className="custom-button" />
          <EditButton className="custom-button" onEdit={handleEdit} />
          <ExportAllButton className="custom-button" />
          <ExportSelectedButton className="custom-button" />
          <ExportImage className="custom-button" />
          <ExportAllRowsImage className="custom-button" />
        </div>
        <div>
          <label htmlFor="searchInput" className="search-label">
            <strong>Search by Incident Number:</strong>
          </label>
          <input
            id="searchInput"
            className="search-input"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <EditModal
        visible={editModalVisible}
        onSubmit={handleSubmitEdit}
        onClose={() => setEditModalVisible(false)}
        initialData={rowToEdit}
      />
      <div className="dataTable-container">
        <DataTable
          title={<strong>Incidents</strong>}
          columns={columns}
          data={filteredData}
          pagination
          responsive
          highlightOnHover
          selectableRows
          keyField="_id"
          selectedRowIds={selectedRowIds}
          onSelectedRowsChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DataTableComponent;
