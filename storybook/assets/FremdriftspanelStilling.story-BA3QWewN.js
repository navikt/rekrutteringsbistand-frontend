import{aw as w,T as I,j as t,x as k,S as x,cz as j,cH as b,cG as g,cA as u,X as y,c$ as _}from"./iframe-rg7Mi9Fm.js";import{w as m,c as D}from"./ContextDecorators-QaS-EKtQ.js";import{F as N,A as v}from"./FullførtStilling-DIQqu9H8.js";import{R as T}from"./GjenåpneStillingKnapp-BL7aovk_.js";import{T as A}from"./TilgangskontrollForInnhold-CE9eUuaq.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BiUNsutO.js";import"./OrganisasjonsnummerAlert-GRi70etK.js";import"./VStack-DrQVJZbY.js";import"./BasePrimitive-BiogUs6_.js";import"./List-B5Zb1zql.js";import"./Link-8vsD6bh1.js";import"./KandidatHendelseTag-BKKMnVDA.js";import"./Tag-CePG_4wH.js";import"./ChatExclamationmark-DihCNQAw.js";import"./FileXMark-BZYKe9uf.js";import"./Trash-DhrK18Rr.js";import"./HandShakeHeart-C_UIIpYx.js";import"./Calendar-t9CMsUw1.js";import"./ThumbUp-C7iiQW3_.js";import"./Table-BphJGzOj.js";import"./index-qMbBKF_W.js";import"./index-B40KJ5b4.js";import"./util-Bnm6XJYa.js";import"./DatoVelger-DduuIQFe.js";import"./useDatepicker-BW8p00pH.js";import"./useControllableState-DviLRBNa.js";import"./Modal-BtsHoWHs.js";import"./floating-ui.react-5sgbQVDa.js";import"./Date.Input-DPh6gKPy.js";import"./useFormField-CH2lF7TD.js";import"./ChevronDown-DW7__CRK.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BrQuwOC3.js";import"./Modal.context-rK_dUd0p.js";import"./Popover-CiXIHFug.js";import"./DismissableLayer-zGpqYdLX.js";import"./startOfMonth-BJHtCIV6.js";import"./Select-BpjCDvW0.js";import"./endOfMonth-ViYGplO_.js";import"./ArrowLeft-BvnaeB9t.js";import"./ArrowRight-B8I2LZc5.js";import"./isSameDay-DXNeZYIs.js";import"./Checkbox-Ch8eP3Gj.js";import"./Fieldset-CJxf0CeF.js";import"./accordion-sPv2pMhS.js";import"./index-T8VujaRg.js";import"./index-ht75xejn.js";import"./index-Bue00-wc.js";import"./Box-BtX5j6sJ.js";import"./Bell-DKnjlFe8.js";import"./PersonChat-BMz3XXvS.js";import"./Eye-AVAFN4xF.js";import"./ProgressBar-BQF6ZTme.js";import"./useLatestRef-DsdRIYNG.js";import"./EyeSlash-BPoQbA2y.js";import"./CircleSlash-BBX4CPAk.js";import"./Pencil-QTlRWd5C.js";import"./FullførStillingModal-BzmxS6xN.js";import"./PersonbrukerTekst-BtpEsYCN.js";import"./ClockDashed-CxRTPhEA.js";import"./IkonNavnAvatar-BksaK4SU.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-BS0xpV1D.js";import"./ErrorBoundary-C09cF50n.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
