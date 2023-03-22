import { useSale } from "./useSale";
import { InputBox } from "../../../../components/InputBox/InputBox";
import { StatusError } from "../../../../components/StatusError/StatusError";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import styles from "./Sale.module.css"

export function Sale() {

    const {
        form, handlerForm, error, fields,
        handlerImage, _asyncSendSaleInfo, isDndActive, 
        dndDrop, dndEnterOver, dndLeaveDrop,
    } = useSale();

    return (
        <div className={[styles.sale, "fade"].join(" ")}>
            <div className={styles.saleBlock}>
                <div className={styles.wrapProductInfo}>
                    <div className={styles.productInfo}>
                        {fields.map(({ name, nameRu }) =>
                            <InputBox
                                key={name}
                                type="text"
                                value={form[name]}
                                name={name}
                                label={nameRu}
                                onChange={handlerForm}
                            />)}
                        <StatusError message={error} />
                    </div>
                </div>
                <div className={styles.productImage}>
                    <div className={styles.dropArea}>
                        <img
                            className={isDndActive ? styles.dndActive : ""}
                            alt=""
                            src={form["image"] ? form["image"] : "/dragAndDrop.png"}
                            draggable
                            onDragEnter={dndEnterOver}
                            onDragOver={dndEnterOver}
                            onDragLeave={dndLeaveDrop}
                            onDrop={dndDrop}
                        />
                    </div>
                    <label className={styles.inputFile}>
                        <span>Выберите файл</span>
                        <input type="file" accept="image\*" onChange={handlerImage} />
                    </label>
                </div>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <SubmitButton onClick={_asyncSendSaleInfo}>Выставить на продажу</SubmitButton>
                </div>
            </div>
        </div>
    );
}