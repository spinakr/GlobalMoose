module StatusFileReader

open FSharp.Data
open System.IO
    
type StatusUpdate = CsvProvider<"statusUpdate.csv">

let loadAllStatusUpdates fileDirectory = 
    match Directory.GetFiles(fileDirectory, "*.csv") with
    | [||] -> [||]
    | arr -> Array.map (Path.GetFullPath >> StatusUpdate.Load) arr
    |> Array.map (fun (s:StatusUpdate) -> s.Rows |> Seq.toList) |> List.concat


