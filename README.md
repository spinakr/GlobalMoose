# GlobalMoose
Book keeping and financial charting program in F#  
Console application reading financial "status updates" from a configured directory

## Setup

- Build and pack the application with by running ``.\build.cmd "Deploy"``
- Unzip the zip .\deploy\PortfolioManager.0.1.zip 
- Edit the PortfolioManager.exe.config to confige the directory to read portfolio updates from.
  - Change the value of ``<add key="FileDirectoryPath" value="C:\\GlobalMoose\\StatusUpdates\\" />``  
  to the desired directory
- Add some status files to the directory on the following format:

Fund,Amount,Invested,Date  
FundName1,1000,200,2017-01-01  
FundName2,2000,200,2017-01-01  

- You can create one file containing updates for multiple dates, or create a new file every time, e.g. one files per month.

