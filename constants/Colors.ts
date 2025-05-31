export const colors = {
  light: {
    // A-Z assigned to colors
    A: { bg: "#f0f0f0", fg: "#646464" }, // gray
    B: { bg: "#e6f4fe", fg: "#0d74ce" }, // blue
    C: { bg: "#def7f9", fg: "#107d98" }, // cyan
    D: { bg: "#381525", fg: "#ff92ad" }, // crimson (dark mode for contrast)
    E: { bg: "#e6f7ed", fg: "#208368" }, // jade (emerald)
    F: { bg: "#ffefd6", fg: "#cc4e00" }, // orange (fire)
    G: { bg: "#e6f6eb", fg: "#218358" }, // green
    H: { bg: "#eff1ef", fg: "#60655f" }, // olive (hint of gray)
    I: { bg: "#f0f1fe", fg: "#5753c6" }, // iris
    J: { bg: "#e6f7ed", fg: "#208368" }, // jade
    K: { bg: "#def7f9", fg: "#107d98" }, // cyan (close to key color)
    L: { bg: "#eef6d6", fg: "#5c7c2f" }, // lime
    M: { bg: "#ddf9f2", fg: "#027864" }, // mint
    N: { bg: "#edf2fe", fg: "#3a5bc7" }, // indigo (navy)
    O: { bg: "#ffefd6", fg: "#cc4e00" }, // orange
    P: { bg: "#fee9f5", fg: "#c2298a" }, // pink
    Q: { bg: "#f7edfe", fg: "#8145b5" }, // purple (queen)
    R: { bg: "#feebec", fg: "#ce2c31" }, // red
    S: { bg: "#e1f6fd", fg: "#00749e" }, // sky
    T: { bg: "#e0f8f3", fg: "#008573" }, // teal
    U: { bg: "#f7edfe", fg: "#8145b5" }, // purple (unique)
    V: { bg: "#f4f0fe", fg: "#6550b9" }, // violet
    W: { bg: "#fffab8", fg: "#9e6c00" }, // yellow (warm)
    X: { bg: "#fbebfb", fg: "#953ea3" }, // plum (exotic)
    Y: { bg: "#fffab8", fg: "#9e6c00" }, // yellow
    Z: { bg: "#f6edea", fg: "#7d5e54" }, // bronze (zest)
  },
  dark: {
    // A-Z assigned to colors (dark theme)
    A: { bg: "#222222", fg: "#b4b4b4" }, // gray
    B: { bg: "#0d2847", fg: "#70b8ff" }, // blue
    C: { bg: "#082c36", fg: "#4ccce6" }, // cyan
    D: { bg: "#381525", fg: "#ff92ad" }, // crimson
    E: { bg: "#0f2e22", fg: "#1fd8a4" }, // jade (emerald)
    F: { bg: "#331e0b", fg: "#ffa057" }, // orange (fire)
    G: { bg: "#132d21", fg: "#3dd68c" }, // green
    H: { bg: "#212220", fg: "#afb5ad" }, // olive (hint of gray)
    I: { bg: "#202248", fg: "#b1a9ff" }, // iris
    J: { bg: "#0f2e22", fg: "#1fd8a4" }, // jade
    K: { bg: "#082c36", fg: "#4ccce6" }, // cyan (close to key color)
    L: { bg: "#1f2917", fg: "#bde56c" }, // lime
    M: { bg: "#092c2b", fg: "#58d5ba" }, // mint
    N: { bg: "#182449", fg: "#9eb1ff" }, // indigo (navy)
    O: { bg: "#331e0b", fg: "#ffa057" }, // orange
    P: { bg: "#37172f", fg: "#ff8dcc" }, // pink
    Q: { bg: "#301c3b", fg: "#d19dff" }, // purple (queen)
    R: { bg: "#3b1219", fg: "#ff9592" }, // red
    S: { bg: "#112840", fg: "#75c7f0" }, // sky
    T: { bg: "#0d2d2a", fg: "#0bd8b6" }, // teal
    U: { bg: "#301c3b", fg: "#d19dff" }, // purple (unique)
    V: { bg: "#291f43", fg: "#baa7ff" }, // violet
    W: { bg: "#2d2305", fg: "#f5e147" }, // yellow (warm)
    X: { bg: "#351a35", fg: "#e796f3" }, // plum (exotic)
    Y: { bg: "#2d2305", fg: "#f5e147" }, // yellow
    Z: { bg: "#262220", fg: "#d4b3a5" }, // bronze (zest)
  },

  // Original color mappings for reference
  // accent: {
  //   light: {
  //     gray: { bg: "#f0f0f0", fg: "#646464" },
  //     gold: { bg: "#f2f0e7", fg: "#71624b" },
  //     bronze: { bg: "#f6edea", fg: "#7d5e54" },
  //     brown: { bg: "#f6eee7", fg: "#815e46" },
  //     yellow: { bg: "#fffab8", fg: "#9e6c00" },
  //     amber: { bg: "#fff7c2", fg: "#ab6400" },
  //     orange: { bg: "#ffefd6", fg: "#cc4e00" },
  //     tomato: { bg: "#feebe7", fg: "#d13415" },
  //     red: { bg: "#feebec", fg: "#ce2c31" },
  //     ruby: { bg: "#feeaed", fg: "#ca244d" },
  //     crimson: { bg: "#ffe9f0", fg: "#cb1d63" },
  //     pink: { bg: "#fee9f5", fg: "#c2298a" },
  //     plum: { bg: "#fbebfb", fg: "#953ea3" },
  //     purple: { bg: "#f7edfe", fg: "#8145b5" },
  //     violet: { bg: "#f4f0fe", fg: "#6550b9" },
  //     iris: { bg: "#f0f1fe", fg: "#5753c6" },
  //     indigo: { bg: "#edf2fe", fg: "#3a5bc7" },
  //     blue: { bg: "#e6f4fe", fg: "#0d74ce" },
  //     cyan: { bg: "#def7f9", fg: "#107d98" },
  //     teal: { bg: "#e0f8f3", fg: "#008573" },
  //     jade: { bg: "#e6f7ed", fg: "#208368" },
  //     green: { bg: "#e6f6eb", fg: "#218358" },
  //     grass: { bg: "#e9f6e9", fg: "#2a7e3b" },
  //     lime: { bg: "#eef6d6", fg: "#5c7c2f" },
  //     mint: { bg: "#ddf9f2", fg: "#027864" },
  //     sky: { bg: "#e1f6fd", fg: "#00749e" },
  //     olive: { bg: "#eff1ef", fg: "#60655f" },
  //   },
  //   dark: {
  //     gray: { bg: "#222222", fg: "#b4b4b4" },
  //     gold: { bg: "#24231f", fg: "#cbb99f" },
  //     bronze: { bg: "#262220", fg: "#d4b3a5" },
  //     brown: { bg: "#28211d", fg: "#dbb594" },
  //     yellow: { bg: "#2d2305", fg: "#f5e147" },
  //     amber: { bg: "#302008", fg: "#ffca16" },
  //     orange: { bg: "#331e0b", fg: "#ffa057" },
  //     tomato: { bg: "#391714", fg: "#ff977d" },
  //     red: { bg: "#3b1219", fg: "#ff9592" },
  //     ruby: { bg: "#3a141e", fg: "#ff949d" },
  //     crimson: { bg: "#381525", fg: "#ff92ad" },
  //     pink: { bg: "#37172f", fg: "#ff8dcc" },
  //     plum: { bg: "#351a35", fg: "#e796f3" },
  //     purple: { bg: "#301c3b", fg: "#d19dff" },
  //     violet: { bg: "#291f43", fg: "#baa7ff" },
  //     iris: { bg: "#202248", fg: "#b1a9ff" },
  //     indigo: { bg: "#182449", fg: "#9eb1ff" },
  //     blue: { bg: "#0d2847", fg: "#70b8ff" },
  //     cyan: { bg: "#082c36", fg: "#4ccce6" },
  //     teal: { bg: "#0d2d2a", fg: "#0bd8b6" },
  //     jade: { bg: "#0f2e22", fg: "#1fd8a4" },
  //     green: { bg: "#132d21", fg: "#3dd68c" },
  //     grass: { bg: "#1b2a1e", fg: "#71d083" },
  //     lime: { bg: "#1f2917", fg: "#bde56c" },
  //     mint: { bg: "#092c2b", fg: "#58d5ba" },
  //     sky: { bg: "#112840", fg: "#75c7f0" },
  //     olive: { bg: "#212220", fg: "#afb5ad" },
  //   },
  // },
};
