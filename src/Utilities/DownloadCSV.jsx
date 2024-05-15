import { msToString } from "./timeFunctions";

export function downloadCSV(data, title, data2, title2) {

    const first = msToString(Number(data[data.length - 1].err_time)).date
    const last = msToString(Number(data[0].err_time)).date

    let csv;

    if (data2.length > 0) {
        csv = [['Date', 'Type', 'Message', 'File', 'Path', 'ID', 'Service', 'Line', 'Module', 'Service ID', 'Stack'], [''], [title2],
        ...data2.map(error => [
            new Date(Number(error.err_time)), error.err_type, decodeURI(error.err_message), error.err_file, error.err_file_path, error.err_id, error.err_job_name, error.err_line_num, error.err_module, error.err_srv_id, error.err_stack
        ]), [''], [title],

        ...data.map(error => [
            new Date(Number(error.err_time)), error.err_type, decodeURI(error.err_message), error.err_file, error.err_file_path, error.err_id, error.err_job_name, error.err_line_num, error.err_module, error.err_srv_id, error.err_stack
        ])].map(e => e.join(",")).join("\n");

    } else {
        csv = [[
            'Date', 'Type', 'Message', 'File', 'Path', 'ID', 'Service', 'Line', 'Module', 'Service ID', 'Stack'
        ], [''], [title],
        ...data.map(error => [
            new Date(Number(error.err_time)), error.err_type, decodeURI(error.err_message), error.err_file, error.err_file_path, error.err_id, error.err_job_name, error.err_line_num, error.err_module, error.err_srv_id, error.err_stack
        ])].map(e => e.join(",")).join("\n");
    }
  
    const download = function (data) {

        // Creating a Blob for having a csv file format and passing the data with type 
        const blob = new Blob([data], { type: 'text/csv' });

        // Creating an object for downloading url 
        const url = window.URL.createObjectURL(blob)

        // Creating an anchor(a) tag of HTML 
        const a = document.createElement('a')

        // Passing the blob downloading url 
        a.setAttribute('href', url)

        // Setting the anchor tag attribute for downloading and passing the download file name 
        a.setAttribute('download', `tuba_report_${title.toLowerCase()}_${first}_to_${last}.csv`);

        // Performing a download with click 
        a.click()
    }

    download(csv)

    return;
}