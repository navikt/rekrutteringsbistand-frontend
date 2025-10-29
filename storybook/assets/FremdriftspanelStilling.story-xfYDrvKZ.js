import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-CWsprw3t.js";import{w as m,c as D}from"./ContextDecorators-DBqGlnG-.js";import{F as N,A as v}from"./FullførtStilling-Bk-IfstO.js";import{R as T}from"./GjenåpneStillingKnapp-DNP3FG7Y.js";import{T as A}from"./TilgangskontrollForInnhold-ByKDXtNu.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BerSAD2E.js";import"./OrganisasjonsnummerAlert-DaVaP0-D.js";import"./VStack-B_EWfe-e.js";import"./BasePrimitive-B4YTk1z6.js";import"./List-ysrSRdjS.js";import"./Link-MXhOho_V.js";import"./KandidatHendelseTag-Dw1yPhZQ.js";import"./Tag-CeYYw2Ty.js";import"./ChatExclamationmark-DrWeS80S.js";import"./FileXMark-Ch7vRQFa.js";import"./Trash-C_yphtYR.js";import"./HandShakeHeart-av9NhUeV.js";import"./Calendar-DWLhiUqM.js";import"./ThumbUp-CoFw-Gyw.js";import"./Table-oblJOpGI.js";import"./util-iDo19sf0.js";import"./format-ehOzs_-A.js";import"./match-Dsa18GTe.js";import"./parse-Bjmf4kLR.js";import"./getDefaultOptions-C2tpzm1R.js";import"./parseISO-spBYb4yQ.js";import"./index-Dpcv5ex9.js";import"./index-B40KJ5b4.js";import"./isBefore-Bj1CNU8z.js";import"./util-DYk6qF1n.js";import"./accordion-DCX6xrap.js";import"./index-BiApvBYr.js";import"./index-Bvu7vBRh.js";import"./index-CkgEVp_C.js";import"./ChevronDown-YzbLBLO9.js";import"./Box-KpH7zjkY.js";import"./Bell-OW6Vx2zM.js";import"./PersonChat-DYEYWw0e.js";import"./Eye-anN-2zFL.js";import"./ProgressBar-DMTFgT2o.js";import"./EyeSlash-Bcqu5W-N.js";import"./CircleSlash-D7jVBaQg.js";import"./Modal-DpubBxtq.js";import"./floating-ui.react-Ct5t2oiB.js";import"./Date.Input-DUAfTzqL.js";import"./useFormField-zQWLLVsR.js";import"./useControllableState-DMcbZf6j.js";import"./Modal.context-DQJtZMa6.js";import"./Checkbox-DYS52Kkn.js";import"./Fieldset-XA31rVF2.js";import"./Pencil-vKcIxZYQ.js";import"./PersonbrukerTekst-BZ3cvFeG.js";import"./ClockDashed-Dk54bEu2.js";import"./Tasklist-DXi_hu8d.js";import"./ErrorBoundary-qCOfYHTc.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
