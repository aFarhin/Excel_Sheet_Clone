# Excel_Sheet_Clone

This is a simple spreadsheet web application using HTML, CSS, and JavaScript. 
The application consists of a table with 26 columns and 100 rows.
Each cell is editable and supports formatting options such as -
bold, italic, underline, text and background color, left, right, and center alignment, 
font size, and font family. 
The app also includes functionality for cutting, copying, and pasting cell content.

The data is saved in JSON format, which is updated in the matrix array whenever the user edits a cell's content or formatting.
The matrix array is a 2D array that stores the data for all sheets in the spreadsheet, where each sheet is represented as a separate 2D array.
The number of sheets is stored in the numSheets variable, 
and the currently active sheet number is stored in the currSheetNum variable.
The code uses event listeners to detect when a user interacts with a cell in the table. When a user selects a cell,
the onFocusFnc() function is called, which sets the currCell variable to the current cell and displays its ID in a label at the top of the page. 
When a user edits a cell's content or formatting, the onInputFnc() function is called, which updates the JSON data for that cell in the matrix array.

Overall, this app provides a basic framework for a spreadsheet application with some formatting options and cut/copy/paste/downlod/upload functionality. 

