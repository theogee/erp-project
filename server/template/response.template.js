module.exports = {
  res200msg: (msg, res) => {
    res.status(200).json({ success: true, msg: msg });
  },
  res201msg: (msg, res) => {
    res.status(201).json({ success: true, msg: msg });
  },
  res200payload: (payload, res) => {
    res.status(200).json({ success: true, data: payload });
  },
  res201payload: (payload, res) => {
    res.status(201).json({ success: true, data: payload });
  },
  res400: (msg, res) => {
    res.status(400).json({ success: false, msg: msg });
  },
  res404: (msg, res) => {
    res.status(404).json({ success: false, msg: msg });
  },
  res500: (err, res) => {
    res.status(500).json({ success: false, msg: err });
  },
};
