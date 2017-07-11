#r "..\..\packages\FSharp.Data\lib\\net40\FSharp.Data.dll"
#r "..\..\packages\FSharp.Configuration\lib\\net45\FSharp.Configuration.dll"
#load "StatusFileReader.fs"
open System.IO
open StatusFileReader


let statusUpdates = loadAllStatusUpdates()
let firstFile = statusUpdates.[0]
printf "\n File:    %A \n" firstFile

let lines = firstFile.Rows
printf "Lines:    %A \n" lines

let firstItem = Seq.item 0 lines
printf "Item:     %A \n" firstItem

let firstProperty = firstItem.Amount
printf "Prop:     %i \n" firstProperty
