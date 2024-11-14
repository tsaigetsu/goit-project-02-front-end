import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SvgIcon from "../SvgIcon/SvgIcon";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as yup from "yup";
import s from "./ModalNeedHelp.module.css";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/selectors";
import { sendHelpCommentThunk } from "../../redux/auth/operations";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  comment: yup
    .string()
    .required("Comment is required")
    .min(5, "Comment must be at least 5 characters"),
});

const ModalNeedHelp = ({ isOpen, onClose }) => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  // console.log("user", user);

  const [isExiting, setIsExiting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: user.email,
      comment: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      setFocus("email");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, setFocus]);

  const handleFormClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      reset();
      onClose();
    }, 300);
  };

  // const onSubmit = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log("Need help:", data);
  //     reset();
  //     handleFormClose();
  //     toast.success("Email sent to tech support. We'll reply soon!", {
  //       duration: 4000,
  //       position: "bottom-center",
  //       icon: "✔️",
  //     });
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await dispatch(sendHelpCommentThunk(data));
      reset();
      handleFormClose();
    } catch (error) {
      console.error("Error sending data:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isExiting) return null;

  return (
    <div
      className={`${s.overlay} ${isExiting ? s.fadeOut : ""}`}
      onClick={handleFormClose}
    >
      <div
        className={`${s.modal} ${isExiting ? s.fadeOut : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.closeBtn} onClick={handleFormClose}>
          <SvgIcon
            id="icon-x-close"
            className={s.closeBtnIcon}
            width="18"
            height="18"
          />
        </button>
        <h2>Need help</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* Поле для ввода email */}
          <div className={s.emailContainer}>
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
              className={s.input}
            />
            {errors.email && (
              <div className={s.errorText}>{errors.email.message}</div>
            )}
          </div>

          {/* Поле для комментария */}
          <div className={s.commentContainer}>
            <textarea
              placeholder="Comment"
              {...register("comment")}
              className={s.textarea}
            />
            {errors.comment && (
              <div className={s.errorText}>{errors.comment.message}</div>
            )}
          </div>

          {/* Кнопка отправки */}
          {/* <button type="submit" className={s.sendBtn}>Send</button> */}
          <button type="submit" className={s.sendBtn} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

ModalNeedHelp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalNeedHelp;


// {
//   "desktop": {
//     "bg1": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757992/bg1-desk-1x_pikx3g.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757997/bg1-desk-2x_iexuqv.jpg"
//     },
//     "bg2": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757994/bg2-desk-1x_f5tx6v.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757994/bg2-desk-2x_u8dhf6.jpg"
//     },
//     "bg3": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757995/bg3-desk-1x_qjwfka.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757999/bg3-desk-2x_zqogvr.jpg"
//     },
//     "bg4": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757996/bg4-desk-1x_usmyy2.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757996/bg4-desk-2x_w673vs.jpg"
//     },
//     "bg5": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757996/bg5-desk-1x_ulfmej.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757998/bg5-desk-2x_vdtp0n.jpg"
//     },
//     "bg6": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757998/bg6-desk-1x_vrndfx.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757998/bg6-desk-2x_gvojmn.jpg"
//     },
//     "bg7": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757998/bg7-desk-1x_ymqhdr.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730758000/bg7-desk-2x_ft2meb.jpg"
//     },
//     "bg8": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757998/bg8-desk-1x_gcmpzl.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730758000/bg8-desk-2x_mzkjpl.jpg"
//     },
//     "bg9": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757999/bg9-desk-1x_bxmwuv.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757999/bg9-desk-2x_pw36zz.jpg"
//     },
//     "bg10": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757999/bg10-desk-1x_oellgs.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730758000/bg10-desk-2x_tuedqx.jpg"
//     },
//     "bg11": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730758000/bg11-desk-1x_amqy2m.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730758001/bg11-desk-2x_cbsfpn.jpg"
//     },
//     "bg12": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730758001/bg12-desk-1x_m0fd8p.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757992/bg12-desk-2x_tpsans.jpg"
//     },
//     "bg13": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757992/bg13-desk-1x_mdf60d.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757995/bg13-desk-2x_zvap96.jpg"
//     },
//     "bg14": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757992/bg14-desk-1x_fkmulj.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757994/bg14-desk-2x_cxbc3o.jpg"
//     },
//     "bg15": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757994/bg15-desk-1x_lbl67c.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730757992/bg15-desk-2x_qwbdlp.jpg"
//     }
//   },
//   "tablet": {
//     "bg1": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761333/bg1-tablet-1x_vqvpkm.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761335/bg1-tablet-2x_qrz9ag.jpg"
//     },
//     "bg2": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761336/bg2-tablet-1x_kiub4x.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761337/bg2-tablet-2x_a9lef9.jpg"
//     },
//     "bg3": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761339/bg3-tablet-1x_lptmyh.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761340/bg3-tablet-2x_pdfhhq.jpg"
//     },
//     "bg4": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761341/bg4-tablet-1x_xvrtby.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761307/bg4-tablet-2x_ye2ykd.jpg"
//     },
//     "bg5": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761308/bg5-tablet-1x_itnozi.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761310/bg5-tablet-2x_pbg9q0.jpg"
//     },
//     "bg6": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761308/bg6-tablet-1x_frsir2.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761309/bg6-tablet-2x_l3fs4l.jpg"
//     },
//     "bg7": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761310/bg7-tablet-1x_smsqmu.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761313/bg7-tablet-2x_sqbvql.jpg"
//     },
//     "bg8": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761313/bg8-tablet-1x_sdwdan.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761314/bg8-tablet-2x_shoam5.jpg"
//     },
//     "bg9": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761315/bg9-tablet-1x_cudagn.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761317/bg9-tablet-2x_pdssa3.jpg"
//     },
//     "bg10": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761318/bg10-tablet-1x_g0h0aj.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761318/bg10-tablet-2x_apqyt2.jpg"
//     },
//     "bg11": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761321/bg11-tablet-1x_lfqvpl.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761321/bg11-tablet-2x_d3elto.jpg"
//     },
//     "bg12": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761322/bg12-tablet-1x_qzs5ml.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761324/bg12-tablet-2x_hw5zim.jpg"
//     },
//     "bg13": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761325/bg13-tablet-1x_hugbdq.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761326/bg13-tablet-2x_o9bfrb.jpg"
//     },
//     "bg14": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761327/bg14-tablet-1x_xb19aa.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761329/bg14-tablet-2x_nofl6t.jpg"
//     },
//     "bg15": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761330/bg15-tablet-1x_pngovi.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761332/bg15-tablet-2x_eoxf3m.jpg"
//     }
//   },
//   "mobile": {
//     "bg1": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761798/bg1-mob-1x_nkwnym.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761801/bg1-mob-2x_tp64ut.jpg"
//     },
//     "bg2": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761802/bg2-mob-1x_rbfro3.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761804/bg2-mob-2x_boy9hi.jpg"
//     },
//     "bg3": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761807/bg3-mob-1x_mwd1zi.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761809/bg3-mob-2x_rsguvr.jpg"
//     },
//     "bg4": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761810/bg4-mob-1x_gudc5j.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761812/bg4-mob-2x_uafj9n.jpg"
//     },
//     "bg5": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761813/bg5-mob-1x_jbf9nm.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761815/bg5-mob-2x_k3knsd.jpg"
//     },
//     "bg6": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761816/bg6-mob-1x_rznkrh.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761816/bg6-mob-2x_yfdwmy.jpg"
//     },
//     "bg7": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761822/bg7-mob-1x_fikaqw.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761823/bg7-mob-2x_cw1q8b.jpg"
//     },
//     "bg8": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761826/bg8-mob-1x_rjncea.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761826/bg8-mob-2x_vz1ug5.jpg"
//     },
//     "bg9": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761829/bg9-mob-1x_lcflem.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761830/bg9-mob-2x_zuv6ld.jpg"
//     },
//     "bg10": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761832/bg10-mob-1x_l4ezo5.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761833/bg10-mob-2x_ivwav8.jpg"
//     },
//     "bg11": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761835/bg11-mob-1x_a4ppel.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761836/bg11-mob-2x_rf661j.jpg"
//     },
//     "bg12": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761837/bg12-mob-1x_mihtbb.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761782/bg12-mob-2x_aypiou.jpg"
//     },
//     "bg13": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761782/bg13-mob-1x_mkp0bh.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761783/bg13-mob-2x_advto6.jpg"
//     },
//     "bg14": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761793/bg14-mob-1x_aq54de.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761794/bg14-mob-2x_vzmdej.jpg"
//     },
//     "bg15": {
//       "normal": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761796/bg15-mob-1x_wtumuc.jpg",
//       "large": "https://res.cloudinary.com/dgdak0eqk/image/upload/v1730761797/bg15-mob-2x_bvcsgy.jpg"
//     }
//   }
// }
