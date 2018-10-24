setup = function()
  addrList = nil
  addrList = getAddressList()

  currentKills = getValue("Player's Kills (In Mission)")
  boardKills = getValue("Board Kills (Player)")
  sorties = getValue("Board Sorties (Player)")
  rank = getValue("Board Rank (Player)")
  callsign = getValue("Callsign (Player)")
  name = getValue("Name (Player)")

  changedValue = false
  currentKillLock = false

  outputFormat = "{\n" ..
                 "  \"currentKills\": %d,\n" ..
                 "  \"boardKills\": %d,\n" ..
                 "  \"sorties\": %d,\n" ..
                 "  \"rank\": %d,\n" ..
                 "  \"callsign\": \"%s\",\n" ..
                 "  \"name\": \"%s\"\n" ..
                 "}\n"
end

printDebug = function()
  print(string.format(outputFormat, currentKills, boardKills, sorties, rank, callsign, name))
end

getValue = function(desc)
  local mr = addrList.getMemoryRecordByDescription(desc)
  return mr.Value
end

writeJson = function()
  local cko = currentKills
  if (currentKillLock) then
    cko = 0
  end
  currentKillsOutput = "  \"currentKills\": " .. cko .. ",\n"
  boardKillsOutput = "  \"boardKills\": " .. boardKills .. ",\n"
  sortiesOutput = "  \"sorties\": " .. sorties .. ",\n"
  rankOutput = "  \"rank\": " .. rank .. ",\n"
  callsignOutput = "  \"callsign\": \"" .. callsign .. "\",\n"
  nameOutput = "  \"name\": \"" .. name .. "\"\n"

  local fpJson = io.open("H:\\Prog\\killboard\\fromgame.json", "w+")

  if (fpJson) then
    fpJson:write("{\n")
      fpJson:write(currentKillsOutput)
      fpJson:write(boardKillsOutput)
      fpJson:write(sortiesOutput)
      fpJson:write(rankOutput)
      fpJson:write(callsignOutput)
      fpJson:write(nameOutput)
    fpJson:write("}\n")
    fpJson:close()
    print("fromgame.json written")
  else
    print("Failure")
    print(fpJson)
  end

  fileWritten = true
end

cfcDebug = function()
  print("")
  print("")
  print("DEBUG")
  if (prevCurrentKills ~= currentKills) then
    print(string.format("CurrentKills: %x => %x", prevCurrentKills, currentKills))
    print(prevCurrentKills)
    print(currentKills)
  end
  if (prevBoardKills ~= boardKills) then
    print(string.format("BoardKills: %d => %d", prevBoardKills, boardKills))
  end
  if (prevSorties ~= sorties) then
    print(string.format("Sorties: %d => %d", prevSorties, sorties))
  end
  if (prevRank ~= rank) then
    print(string.format("Rank: %d => %d", prevRank, crank))
  end
  if (prevCallsign ~= callsign) then
    print(string.format("Callsign: %d => %d", prevCallsign, callsign))
  end
  if (prevName ~= name) then
    print(string.format("Name: %d => %d", prevName, name))
  end
end

checkForChanges = function()
  changedValue = ((prevCurrentKills ~= currentKills) or
                  (prevBoardKills ~= boardKills) or
                  (prevSorties ~= sorties) or
                  (prevRank ~= rank) or
                  (prevCallsign ~= callsign) or
                  (prevName ~= name))
  if (changedValue == true) then
    local bk = tonumber(boardKills)
    local pbk = tonumber(prevBoardKills)
    local ck = tonumber(currentKills)
    local pck = tonumber(prevCurrentKills)
    if (bk > 0 and bk == (pbk + ck)) then
      -- we are in the debriefing
      currentKillLock = true
      print("currentKillLock = true")
    end
    if ((pck > 0) and (ck == 0)) then
      currentKillLock = false
      print("currentKillLock = false")
    end
  end
end

outputMain = function(timer)
  prevCurrentKills = currentKills
  prevBoardKills = boardKills
  prevSorties = sorties
  prevRank = rank
  prevCallsign = callsign
  prevName = name

  addrList = getAddressList()

  currentKills = getValue("Player's Kills (In Mission)")
  boardKills = getValue("Board Kills (Player)")
  sorties = getValue("Board Sorties (Player)")
  rank = getValue("Board Rank (Player)")
  callsign = getValue("Callsign (Player)")
  name = getValue("Name (Player)")

  checkForChanges()

  if (changedValue == true) then
    cfcDebug()
    writeJson()
  end
end

setup()

local outputTimer = createTimer(getLuaEngine())
outputTimer.Interval = 1000
outputTimer.OnTimer = outputMain