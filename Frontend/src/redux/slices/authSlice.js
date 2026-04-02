
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, getProfile } from "../../api/authApi";

// ✅ LOGIN
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      return await loginUser({ email, password });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// ✅ PROFILE
export const getProfileThunk = createAsyncThunk(
  "auth/getProfile",
  async (token, thunkAPI) => {
    try {
      return await getProfile(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  // ✅ Restore token from localStorage
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    profile: null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.profile = null;

      // ✅ remove token
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔐 LOGIN
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        // ✅ Save token
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👤 PROFILE
      .addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ FIX: handle both response types
        state.profile = action.payload.user || action.payload;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;