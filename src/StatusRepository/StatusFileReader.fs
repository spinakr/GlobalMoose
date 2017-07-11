module StatusFileReader

open FSharp.Data
open System.IO
open FSharp.Configuration
    
type Settings = AppSettings<"App.config">
type StatusUpdate = CsvProvider<"statusUpdate.csv">

let loadAllStatusUpdates() = 
    printf "Reading from directory:      %s" Settings.FileDirectoryPath
    match Directory.GetFiles(Settings.FileDirectoryPath, "*.csv") with
    | [||] -> [||]
    | arr -> Array.map (Path.GetFullPath >> StatusUpdate.Load) arr


