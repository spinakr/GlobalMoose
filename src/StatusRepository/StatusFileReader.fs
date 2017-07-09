module StatusFileReader

open FSharp.Data
open System.IO
    
type StatusUpdate = CsvProvider<"transactions.csv">

let loadAllTransactions() = 
    match Directory.GetFiles(__SOURCE_DIRECTORY__, "*.csv") with
    | [||] -> [||]
    | arr -> Array.map (Path.GetFileName >> StatusUpdate.Load) arr


