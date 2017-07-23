module StatusRepositoryTests

open NUnit.Framework
open StatusFileReader

[<Test>]
let ``LoadAllStatusUpdates_ShouldReadAllFilesInDirectory`` () =
    let statusUpdates = loadAllStatusUpdates "tests\\StatusRepositoryTests\\TestFiles\\"
    let firstFile = statusUpdates.[0]

    let firstItem = Seq.item 0 statusUpdates
    let amount = firstItem.Amount

    Assert.AreEqual(amount, 1000)






