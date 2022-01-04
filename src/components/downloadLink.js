/* eslint-disable jsx-a11y/anchor-has-content */
import axios from 'axios';
import React from "react";
import { API_URL } from "../config";
import { useDownloadFile } from '../hooks/useDownloadFile';

export const DownloadFileLink = ({username, type, startDate, endDate}) => {

  const fetchFile = () => {
    const body = {
      "fromTimestamp": startDate,
      "toTimestamp": endDate,
      "osmUsernames": [username],
      "issueTypes": ["badgeom"],
      "outputType": type === "json" ? "geojson" : type
    }
    return axios.post(`${API_URL}/data-quality/user-reports`, body)
  }

  const getFileName = () => {
    return `${username}.${type}`;
  };

  const onError = () => {
    console.log('error')
  }

  const { ref, fileData, download, fileName } = useDownloadFile({
    fetchFile,
    onError,
    getFileName,
  });

  return (
    <>
      <a 
        href={type === "csv" ? `data:text/csv;charset=utf-8,${escape(fileData)}` :
          "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fileData))} 
        download={fileName} 
        className="hidden" 
        ref={ref} 
      />
      <button
        name="user-quality-btn "
        onClick={download} 
        className="underline text-red"
      >
        {type === 'csv' ? "CSV" : "JSON"}
      </button>
    </>
  )
};
