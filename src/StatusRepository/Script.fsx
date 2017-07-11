#r "..\..\packages\FSharp.Data\lib\\net40\FSharp.Data.dll"
#r "..\..\packages\FSharp.Configuration\lib\\net45\FSharp.Configuration.dll"
#load "StatusFileReader.fs"
open System.IO
open StatusFileReader


let statusUpdates = loadAllStatusUpdates "C:\\Users\\ank\\OneDrive\\GlobalMoose\\StatusUpdates\\"
let firstFile = statusUpdates.[0]
printf "\n File:    %A \n" firstFile

let firstRow = firstFile.Rows |> Seq.head
printf "Row:    %A \n" firstRow

let firstProperty = firstRow.Amount
printf "Prop:     %i \n" firstProperty
