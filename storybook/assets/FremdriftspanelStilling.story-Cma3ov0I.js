import{aw as w,T as I,j as t,x as k,S as x,cz as j,cH as b,cG as g,cA as u,X as y,c$ as _}from"./iframe-Dy0lgISD.js";import{w as m,c as D}from"./ContextDecorators-Cy19EL9c.js";import{F as N,A as v}from"./FullførtStilling-Bm5F176m.js";import{R as T}from"./GjenåpneStillingKnapp-DS6K5WNX.js";import{T as A}from"./TilgangskontrollForInnhold-D2ruT-GM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-4ihAi1Vd.js";import"./OrganisasjonsnummerAlert-Bhoy52Yu.js";import"./VStack-DoN2IO4E.js";import"./BasePrimitive-CQr7-pyL.js";import"./List-Dx95tQEs.js";import"./Link-dq1pqMCI.js";import"./KandidatHendelseTag-sB1FI4LX.js";import"./Tag-Bgfs15oY.js";import"./ChatExclamationmark-mnpx42yJ.js";import"./FileXMark-Dvyb1woY.js";import"./Trash-CQFlK5ks.js";import"./HandShakeHeart-CsXAGir8.js";import"./Calendar-DkoO1Plo.js";import"./ThumbUp-DhsAfMQl.js";import"./Table-BR6gcF0p.js";import"./index-B4PmVqKX.js";import"./index-B40KJ5b4.js";import"./util-BRqn0qrI.js";import"./DatoVelger-DpMJ2BRB.js";import"./useDatepicker-Bp5SsHH1.js";import"./useControllableState-DsPI5clQ.js";import"./Modal-aidDq1f6.js";import"./floating-ui.react-D5df03w-.js";import"./Date.Input-BgiE-HeY.js";import"./useFormField-CKGIjrUK.js";import"./ChevronDown-BUvm8QKR.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BppbtjEv.js";import"./Modal.context-BzlekgQp.js";import"./Popover-ClhAQ4NF.js";import"./DismissableLayer-CwiY48hJ.js";import"./startOfMonth-rtwg3LPP.js";import"./Select-oaEvB0HW.js";import"./endOfMonth-DkUyFd5m.js";import"./ArrowLeft-DB0SmzGs.js";import"./ArrowRight-DQGKiHNm.js";import"./isSameDay-D4Ri7RdE.js";import"./Checkbox-CrmAWtCk.js";import"./Fieldset-Cw9YhqXh.js";import"./accordion-BXW2Ed4i.js";import"./index-Dwup6AM6.js";import"./index-LPqmJGl3.js";import"./index-BsS9fJE_.js";import"./Box-mCD9pM9Z.js";import"./Bell-Cl3XTcxm.js";import"./PersonChat-DaBubQf0.js";import"./Eye-zERW1joQ.js";import"./ProgressBar-BJtsxPOY.js";import"./useLatestRef-kNqACp-i.js";import"./EyeSlash-CPDuuySF.js";import"./CircleSlash-CqFIomWe.js";import"./Pencil-Da8uvjWw.js";import"./FullførStillingModal-CZuX5tPn.js";import"./PersonbrukerTekst-BuXPi8Tr.js";import"./ClockDashed-BrrHWgnd.js";import"./IkonNavnAvatar-7c-cHYJj.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DDijeV7h.js";import"./ErrorBoundary-DcGz619Z.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
