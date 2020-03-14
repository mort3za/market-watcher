const { compare } = require("../utils/compare");

exports.routeCompare = async (req, res) => {
  let result;
  try {
    result = await compare();

    res.json(result.data).end();
  } catch (error) {
    onError(res, error);
  }

  function onError(res, error) {
    res
      .status(400)
      .json({ error: true, data: error })
      .end();
  }
};
