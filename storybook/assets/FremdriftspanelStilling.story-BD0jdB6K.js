import{ax as I,U as w,j as t,y as k,S as x,cz as j,cH as b,cG as g,cA as u,Y as y,c$ as _}from"./iframe-DZidc6ne.js";import{w as m,c as D}from"./ContextDecorators-6Nl0HuAJ.js";import{F as N,A as v}from"./FullførtStilling-DuVj2BxX.js";import{R as T}from"./GjenåpneStillingKnapp-DSWlOEeK.js";import{T as A}from"./TilgangskontrollForInnhold-DgLG4dKl.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-XXfOC6Ua.js";import"./OrganisasjonsnummerAlert-KIBS92ps.js";import"./VStack-CT35bcBK.js";import"./BasePrimitive-DGGTuBQu.js";import"./List-Gkk8Lnu_.js";import"./Link-Bxi8Cnjn.js";import"./KandidatHendelseTag-CDMJayi4.js";import"./Tag-CJ_ullEH.js";import"./ChatExclamationmark-Yizz6DWz.js";import"./FileXMark-1hih9fuA.js";import"./Trash-CDbBnfx-.js";import"./HandShakeHeart-BcmZNNpe.js";import"./Calendar-CPHCr-VW.js";import"./ThumbUp-Cy7GuqiG.js";import"./Table-CTmqYVAw.js";import"./index-BzqkoKl8.js";import"./index-B40KJ5b4.js";import"./util-Bbk_Wzm7.js";import"./DatoVelger-CEzv9LKe.js";import"./useDatepicker-fBpKYMC1.js";import"./useControllableState-d5QaYALg.js";import"./Modal-oJVF93Mp.js";import"./floating-ui.react-DFMGLDtM.js";import"./Date.Input-B65l9rmO.js";import"./useFormField-CwgffQtB.js";import"./ChevronDown-CGg0Kr-2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-vxo5oBkf.js";import"./Modal.context-tifpMkeE.js";import"./Popover-B4ShxoPo.js";import"./DismissableLayer-CDRd_4R5.js";import"./startOfMonth-BDrfWzVr.js";import"./Select-DYlAsMEG.js";import"./endOfMonth-BMGUkB-i.js";import"./ArrowLeft-CW8aoamA.js";import"./ArrowRight-BvS4H3Z5.js";import"./isSameDay-d3quKuOf.js";import"./Checkbox-CpMmLc_m.js";import"./Fieldset-S3jQApAV.js";import"./accordion-DU_8hMBh.js";import"./index-DOxp0CUS.js";import"./index-BsD5Ft68.js";import"./index-CJmrTFXq.js";import"./Box-BGbtHydj.js";import"./Bell-BW2Tk3YD.js";import"./PersonChat-DrKJT0Pz.js";import"./Eye-DumbYgbn.js";import"./ProgressBar-BWVGd8xZ.js";import"./useLatestRef-DTm9dWeK.js";import"./EyeSlash-a1WSFMwv.js";import"./CircleSlash-Q9TPWKJg.js";import"./Pencil-BFiEL-pQ.js";import"./FullførStillingModal-BphLUy39.js";import"./PersonbrukerTekst-ak8IFHYn.js";import"./ClockDashed-gqmwXZjT.js";import"./IkonNavnAvatar-DukTbzDH.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-SCD6sJz7.js";import"./ErrorBoundary-B1MUiphV.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
